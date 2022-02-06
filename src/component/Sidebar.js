import React, {useState, useEffect} from 'react';
import { Avatar, IconButton } from "@mui/material"
import DonutLargeRoundedIcon from '@mui/icons-material/DonutLargeRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import './Sidebar.css'
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import db from '../firebase';
import { useStateValue } from '../StateProvider';

function Sidebar() {
    const [{user}, dispatch] = useStateValue();
    const [room, setRoom] = useState([]);
    useEffect(() => {
      db.collection('room').onSnapshot((snapshot) => {
          setRoom(
              snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data()
                }))
          )
      })
    }, []);
    
    return <div className='sidebar'>
        <div className="sidebar-header">
            <Avatar src='https://lh3.googleusercontent.com/a-/AOh14Ghn7WTxqwt-vdxeMRae1fmPirrH6SSL5YCD2kV9rg=s96-c'/>
            <div className="sidebar-headerRight">
                <IconButton>
                    <DonutLargeRoundedIcon />
                </IconButton>
                <IconButton>
                    <ChatRoundedIcon />
                </IconButton>
                <IconButton>
                    <MoreVertRoundedIcon />
                </IconButton>
            </div>
        </div>
        <div className="sidebar-search">
            <div className="sidebar-searchContainer">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <input style={{ border: 'none', outline: 'none', width: '100%', background: 'white', marginLeft: '4px' }} placeholder='Serach or Start new chat' type="search" />
            </div>
        </div>
        <div className="sidebar-chat">
            <SidebarChat addNewChat/>
            {room.map((room) => (
                <SidebarChat key={room.id} id={room.id} name={room.data.name} />
            ))}
        </div>
    </div>;
}

export default Sidebar;
