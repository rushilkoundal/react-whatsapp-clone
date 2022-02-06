import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import './Chat.css'
import { useParams } from 'react-router-dom';
import db from '../firebase';

function Chat() {
    const { roomId } = useParams();
    const [input, setInput] = useState("");
    const [roomName, setRoomName] = useState("");
    const [message, setMessage] = useState([]);
    const onChange = (e) => {
        setInput(e.target.value)
    }

    useEffect(async() => {
        if (roomId) {
            db.collection('room').doc(roomId).onSnapshot((snapshot) => (
                setRoomName(snapshot.data().name)
            ));

            await db.collection('room').doc(roomId).orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessage(snapshot.docs.map(doc => doc.data()))
            ))

            // const q = query(collection(db, 'room'))
            // const unsub = onSnapshot(q, (snapshot) => {
            //     setMessage(snapshot.docs.map(doc => doc.data()));
            //     console.log("Data", snapshot.docs.map(doc => doc.data()));
            // });
            // unsub();
        }
    }, [roomId]);

    const sendMsg = (e) => {
        e.preventDefault();
        console.log('typed', input);
        setInput('')
    }
    return <div className='chat'>
        <div className="chat-header">
            <Avatar />
            <div className="chat-headerInfo">
                <h4>{roomName}</h4>
                <p style={{ color: 'grey' }}>info</p>
            </div>
            <div className="chat-headerRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <MoreVertRoundedIcon />
                </IconButton>
            </div>
        </div>
        <div className="chat-body">
            {message.map((message) => (
                <p className={`chat-message ${true && 'chat-reciever'}`}>{message.message}
                    {/* <span>
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span> */}
                </p>
            ))}
        </div>
        <div className="chat-footer">
            <div className="msgType-container">
                <IconButton className='ico'>
                    <InsertEmoticonIcon />
                </IconButton>
                <IconButton className='ico file'>
                    <AttachFileIcon />
                </IconButton>
                <form>
                    <input onChange={onChange} value={input} style={{ border: 'none', outline: 'none', marginLeft: '4px', padding: '15px', borderRadius: '10px' }} type="text" placeholder='Type a message' />
                    <button type='submit' onClick={sendMsg}></button>
                </form>
                <IconButton className='ico'>
                    <KeyboardVoiceIcon />
                </IconButton>
            </div>
        </div>
    </div>;
}

export default Chat;
