import React, { useEffect, useState } from 'react'

const UserItem = ({ userItem, friend, setSelectedChat, checkOnline, notifyMessage, selectedChat, setNotifyMessages }) => {
    const onClick = () => {
        setSelectedChat(friend)
    }
    const [dis, setDis ]= useState('hidden')
    // console.log(notifyMessage.to===friend.username)
    // console.log(selectedChat)
    // console.log(friend)
    // console.log(selectedChat.username===friend.username)
    // console.log(notifyMessage)
    useEffect(()=>{
        if(notifyMessage[0]?.from===friend.username){
            if(selectedChat.username===notifyMessage[0]?.from){
                setDis('hidden');
                setNotifyMessages([])
                
            }else{
                setDis('flex')
            }
        }
    })
    return (
        <>
            <div onClick={onClick} className={`cursor-pointer ${userItem} bg-[#373E4E] h-14 rounded-3xl w-full items-center justify-between px-2`}>

                <div className="flex justify-end w-11 h-11 rounded-full bg-red-300 ">
                    <div className={`w-3 h-3 self-end ${checkOnline ? 'bg-green-600' : 'bg-red-700'} rounded-full `} />

                </div>
                {/* </div> */}
                <div className=" w-[50%]">
                    <div className="text-xl">{friend.username}</div>
                    <div className=''>
                        {/* <div className="text-sm opacity-50">last msg</div> */}
                        {    notifyMessage[0]?.from===friend.username &&
                            <div  className={`${dis} text-sm  items-center justify-center rounded-full bg-red-500  w-24 h-5`}>new message</div>
                        }
                        {/* {    (!(selectedChat.username===friend.username) && notifyMessage[0]?.from===friend.username) &&
                            <div className="text-sm flex items-center justify-center rounded-full bg-red-500  w-4 h-4">1</div>
                        } */}
                    </div>

                </div>
                <div className="text-sm opacity-50">9:34AM</div>
            </div>
        </>
    )
}

export default UserItem