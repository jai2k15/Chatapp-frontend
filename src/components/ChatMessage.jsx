import React from 'react'

const ChatMessage = ({ message }) => {

    return (
        <>
            <div className={`flex ${message?.type==='sended'?'self-end':'self-start'} ${message?.type==='sended'?'bg-green-800':'bg-[#1B202D]'}  w-fit p-2 h-fit max-w-[70%]  rounded-lg my-2`}>
                <div>
                    {message?.message}
  
                </div>
            </div>
        </>
    )
}

export default ChatMessage