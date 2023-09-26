import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }
  const handleHome = () => {
    navigate('/')
  }
  return (
    <>
      <div className='h-full w-24 \ bg-[#373E4E] rounded-xl flex flex-col items-center justify-between py-4'>
        <Link to='/accountsetting'><div className='h-16 w-16 bg-purple-400 rounded-full'></div>
          <div className="text-center">{localStorage.getItem("username")}</div></Link>
        <div className='cursor-pointer' onClick={handleHome}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>

        </div>
        <div className='cursor-pointer' onClick={handleLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>

        </div>
      </div>
    </>
  )
}

export default Navbar