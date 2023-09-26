import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Chat from './Chat';
import Users from './Users';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [selectedChat, setSelectedChat] = useState();
    const [socketConnected, setSetsocketConnected] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [notifyMessage, setNotifyMessages] = useState([]);

    const [users, setUsers] = useState();
    const navigate = useNavigate();
    useEffect(() => {

        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])
    // console.log(selectedChat)
    return (
        <>

            <div className='text-white flex h-full p-8 space-x-10'>
                <Navbar />
                <Users setNotifyMessages={setNotifyMessages} notifyMessage={notifyMessage} onlineUsers={onlineUsers} setUsers={setUsers} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
                <Chat notifyMessage={notifyMessage} setNotifyMessages={setNotifyMessages} onlineUsers={onlineUsers} setOnlineUsers={setOnlineUsers} setSetsocketConnected={setSetsocketConnected} users={users} selectedChat={selectedChat} />
            </div>
        </>
    )
}

export default Home