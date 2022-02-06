import { Avatar, Divider, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import db from '../firebase';
import './SidebarChat.css'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

function SidebarChat({ name, id, addNewChat }) {
    const [seed, setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 1000));
    }, []);

    const createRoom = () => {
        const roomName = prompt('Please enter the room name')

        if (roomName) {
            db.collection('room').add({
                name: roomName
            })
        }
    }

    return !addNewChat ? (<Link style={{textDecoration: 'none'}} to={`/room/${id}`} > <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat-info">
            <h4>{name}</h4>
            <p style={{ color: 'grey' }}>last message</p>
        </div>
    </div>
        <Divider style={{ width: '85%', marginLeft: '51px' }} /> </Link>
    ) : (
        <div onClick={createRoom} className="sidebarChat">
            <h4 style={{marginLeft: '25%'}}>Add New Chat</h4>
            <IconButton>
                <AddIcon />
            </IconButton>
        </div>
    )

}

export default SidebarChat;
