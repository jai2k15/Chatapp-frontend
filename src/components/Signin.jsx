import React, { useState, useContext, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import userContext from '../context/user/userContext';
const url = "https://chatting-backend-whgy.onrender.com"

const Signin = (props) => {
  const [passwordColor, setPasswordColor] = useState('text-white')
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", dob: "", gender:"",confirm_password:"" })
  let navigate = useNavigate();
  const Context = useContext(userContext);
  const {setUser} = Context;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(credentials.password!=credentials.confirm_password){
      return alert("password mismatch")
    }


    const { name, email, password, dob, gender } = credentials;
    if(credentials.gender===null || credentials.gender==="Select"){
      return alert('Gender can not be null')
    }
    const response = await fetch(`${url}/api/user/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, email, password, dob, gender })
    });
    const json = await response.json();
    console.log(json.status);
    if(json.status==='user already exist'){
      return alert('User Already exist')
    }
    setUser(json.user);
    navigate('/username')
  
    
    // console.log(JSON.stringify({name, email, password, dob}))
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    
    
    
  }
  useEffect(()=>{
    if(credentials.password!=credentials.confirm_password){
      setPasswordColor('text-red-500');
    }
    else{
      setPasswordColor('text-white')
    }
  },)
  console.log("p "+credentials.password)
  console.log("cp "+credentials.confirm_password)
  

  
  return (
    <>
      <div className='flex flex-col items-center  p-4 my-auto mx-auto w-[30%] h-[80%] rounded-3xl bg-[#373E4E] text-white space-y-10'>
        <h1 className='text-4xl text-center font-bold text-white opacity-50'>SignIn</h1>
        <form onSubmit={handleSubmit} action="" className='flex flex-col w-full items-center self-center justify-self-center justify-center space-y-5 '>
          <input onChange={onChange} htmlFor='name' className='outline-none w-[90%] h-12 bg-[#1B202D] rounded-xl px-2' placeholder='Enter Your Name' type="text" name="name" id="" required/>

          <input onChange={onChange} htmlFor='email' className={` w-[90%] h-12 bg-[#1B202D] rounded-xl px-2`} placeholder='Enter Your Email' type="email" name="email" id="" required/>

          <input onChange={onChange} htmlFor='password' className='w-[90%] h-12 bg-[#1B202D] rounded-xl px-2' placeholder='Enter Your Password' type="Password" name="password" id="" required/>

          <input onChange={onChange} htmlFor='confirm_password' className={`${passwordColor} w-[90%] h-12 bg-[#1B202D] rounded-xl px-2`} placeholder='Confirm Password' type="Password" name="confirm_password" id="confirm_password" required/>



          <input onChange={onChange} htmlFor='dob' className=' w-[90%] h-12 bg-[#1B202D] rounded-xl px-2' placeholder='Enter Your DOB' type="date" name="dob" id="" required/>

          <label htmlFor="gender" className='w-[90%] h-12 flex 0 items-center px-2 bg-[#1B202D] rounded-xl justify-between'>
            <span className='opacity-50'>Gender</span>  :
            <select onChange={onChange} name='gender' className='w-[70%] h-7 bg-inherit outline-none' required>
              <option value="null">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          <button className='self-center bg-[#1B202D] text-white rounded-xl w-48 h-12 text-xl'><span className='opacity-50 hover:opacity-100'>Create Account</span></button>
        </form>
      </div>
    </>
  )
}

export default Signin