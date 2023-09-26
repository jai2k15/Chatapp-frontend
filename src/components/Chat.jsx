import React, { useEffect, useState, useRef, useCallback } from 'react'
import { io } from 'socket.io-client';
import ChatMessage from './ChatMessage';
const ENDPOINT = "http://localhost:8001";
const url = "https://chatting-backend-whgy.onrender.com"

let socket, selectedChatCompare, receivedMsg, msgFrom;
const Chat = ({ selectedChat, users, setSetsocketConnected, setOnlineUsers, notifyMessage, onlineUsers, setNotifyMessages }) => {
  const [message, setMessage] = useState("");
  const [msgNotify, setMsgNotify] = useState([])
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);
  selectedChatCompare = selectedChat?.username;
  useEffect(() => {

    socket = io(url, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });
    socket.emit('setup', { userId: localStorage.getItem("id"), username: localStorage.getItem("username") });
    socket.on("connection", () => {
      if (socket.connected) {
        setSetsocketConnected(true)
      }
    })
    socket.emit('join_chat', selectedChat?.username);



  }, [selectedChat]);

  useEffect(() => {
    socket.on('get_users', (users) => {
      setOnlineUsers(users);
    })
  }, [])

  const onChange = (e) => {
    setMessage(e.target.value);
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim().length <= 0) {
      return
    }
    else {

      
      const data = {
        msg: message,
        username: localStorage.getItem("username"),
        chatId: selectedChat,
        users: users,
      }
      setMessages([...messages, { message: message, type: 'sended' }])
      socket.emit('send_message', data);
      setMessage("");
    }
  }

  useEffect(() => {
    selectedChatCompare = selectedChat?.username;
    socket.on('message_received', (data) => {
      // console.log(data.chatId)
      if (data.chatId.username === localStorage.getItem("username")) {
        if (selectedChatCompare === data.username) {
          setMessages([...messages, { message: data.msg, type: "received" }]);
          setNotifyMessages('')
        }
        else {
          receivedMsg = data.msg;
          msgFrom = data.username
          setNotifyMessages([...notifyMessage, { message: receivedMsg, type: "received", from: msgFrom }])
        }
      }
    })
  }, [handleSendMessage, messages, selectedChat])

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>

      <div className=' bg-[#373E4E] w-[60%] h-full rounded-3xl p-2'>
        {selectedChat &&
          <div className='bg-[#373E4E] w-full h-full rounded-3xl p-2'>
            <div className='bg-[#373E4E] h-16 rounded-3xl w-full flex items-center justify-between p-4'>
              <div className="w-16 h-16 rounded-full bg-red-300 "></div>
              <div className=" w-[90%] ">
                <div className="text-xl">{selectedChat?.username}</div>
                <div className="text-sm opacity-50">last msg</div>
              </div>
            </div>
            <hr className='opacity-20' />
            <div className={`flex flex-col w-full h-[80%] p-2 scroll overflow-y-auto`}>
              {
                messages?.map((message, index) => {
                  return <ChatMessage key={index} message={message} />
                })
              }

              <div ref={lastMessageRef} />
            </div>
            <hr className='opacity-20' />

            <div className="flex h-[12%] items-center justify-between px-4">
              <form onSubmit={handleSendMessage} className='h-full flex items-center justify-between w-full' action="">

                <div className='w-[90%] h-12'>
                  <input onChange={onChange} value={message} type="text" className='px-4 w-[100%] rounded-3xl h-full bg-[#1B202D] outline-none' />
                </div>
                <div>
                  send
                </div>
              </form>
            </div>
          </div>
        } {
          !selectedChat &&
          <div className='flex h-full items-center justify-center text-5xl font-bold text-slate-800'>
            Select any user to chat
          </div>
        }
      </div>
    </>
  )
}

export default Chat;