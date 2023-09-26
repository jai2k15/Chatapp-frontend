import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import tokenContext from '../context/token/tokenContext';
import userContext from '../context/user/userContext';
import { Link } from 'react-router-dom';
const url = "https://chatting-backend-whgy.onrender.com"

const Login = (props) => {
  const [credentials, setCredentials] = useState({  username: "", password: "" })
  let navigate = useNavigate();
  const Context1 = useContext(tokenContext);
  const {setToken} = Context1;
  const Context2 = useContext(userContext);
  const {setUser}= Context2;
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const {  username, password } = credentials;
    const response = await fetch(`${url}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password })
    });
    const json = await response.json();
    // console.log(json);

    if(json.status==="incorrect Credentials") return alert("Wrong Credentials");
    const user = json.user
    setUser(user)
    setToken(json.token);
    localStorage.setItem("token", json.token)
    localStorage.setItem("id", user._id);
    localStorage.setItem("name", user.name);
    localStorage.setItem("email", user.email);
    localStorage.setItem("dob", user.dob);
    localStorage.setItem("dob", user.dob);
    localStorage.setItem("gender", user.gender);
    localStorage.setItem("username", user.username);

    navigate('/')


  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: (e.target.value).toLowerCase() });
    
  }
  return (
    <>
      <div className='flex flex-col space-y-10 items-center p-4 my-auto mx-auto w-[25%] h-[60%] rounded-3xl bg-[#373E4E] text-white'>
        <h1 className='text-4xl text-center font-bold text-white opacity-50'>Login</h1>
        <form onSubmit={handleSubmit} action="" className='flex flex-col w-full self-center items-center justify-self-center space-y-10'>
            <input onChange={onChange} htmlFor='username'  className='w-[90%] h-12 bg-[#1B202D] rounded-xl px-2' placeholder='Enter Your Username' type="text" name="username" id="" required/>
            <input onChange={onChange} htmlFor='password'  className='w-[90%] h-12 bg-[#1B202D] rounded-xl px-2' placeholder='Enter Your Password' type="password" name="password" id="" required/>
            <button className='self-center bg-[#1B202D] text-white rounded-2xl w-24 h-10'>Login</button>
        </form>
        <div>
          <span className='text-base'>Don't have an Account<Link to='/signin'> <button className='text-xl font-bold text-white '>Sign In</button></Link></span>
        </div>
      </div>
    </>
  )
}

export default Login