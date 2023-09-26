import React, { useState, useContext } from 'react'
import userContext from '../context/user/userContext';
import { useNavigate } from 'react-router-dom';
const url = "https://chatting-backend-whgy.onrender.com"

const Username =  (props) => {
    const navigate = useNavigate();
    const Context = useContext(userContext);
    const {user} = Context;
    // console.log(user._id)
    let id = user._id;
    const [username, setUsername] = useState();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`${url}/api/user/updateUsername/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username })
    });
    const json = await response.json();
    if(json.status==="username already exist"){
        alert("Username already exist")
    }
    console.log(json);
    navigate("/login")
    }
    const onChange = (e) => {

        setUsername((e.target.value).toLowerCase());
      }
  return (
    <>
    <div>
    <div className='flex flex-col space-y-20 items-center p-4 my-auto mx-auto w-[25%] h-[50%] rounded-3xl bg-[#373E4E] text-white'>
        <h1 className='text-4xl text-center font-bold text-white opacity-50'>Create Account</h1>
        <form onSubmit={handleSubmit} action="" className='flex flex-col w-full self-center items-center justify-self-center space-y-10'>
            <input onChange={onChange} htmlFor='email'  className='w-[90%] h-12 bg-[#1B202D] rounded-xl px-2' placeholder='Enter Your Username' type="text" name="email" id="" />
            <button className='self-center bg-[#1B202D] text-white rounded-2xl w-24 h-10'>Create</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Username