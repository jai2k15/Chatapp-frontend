import React from 'react'
import Navbar from './Navbar'
const AccountSetting = () => {
    
    return (
        <>
            <div className='flex w-full h-full p-8 space-x-80'>
                <Navbar />
                <div className="bg-[#373E4E] w-[50%] rounded-2xl h-full p-4 space-y-6">
                    <div className="flex flex-col items-center justify-center  space-y-7">
                        <div image className='flex'>

                            <img className="h-72 w-72 rounded-full" src="../../img.jpg" alt="" />
                            <label htmlFor="input-file">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6 b">
                                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                </svg>

                            <input  className='hidden' type="" name="" id="input-file" />
                            </label>
                        </div>

                        <div className='w-1/2'>
                            <form className='text-lg text-white w-full flex flex-col space-y-5' action="">
                                <input type="text" className='h-10 bg-[#1B202D] rounded-3xl px-2 text-center' value={localStorage.getItem("name")}  readOnly/>
                                <input type="text" className='h-10 bg-[#1B202D] rounded-3xl px-2  text-center' value={localStorage.getItem("username")} readOnly/>
                                <input type="text" className='h-10 bg-[#1B202D] rounded-3xl px-2  text-center' value={localStorage.getItem("email")} readOnly/>
                                <input type="text" className='h-10 bg-[#1B202D] rounded-3xl px-2  text-center' value={localStorage.getItem("gender")} readOnly/>
                                <input type="text" className='h-10 bg-[#1B202D] rounded-3xl px-2  text-center' value={localStorage.getItem("dob")} readOnly/>
                                {/* <input type="text" className='h-10 bg-[#1B202D] rounded-3xl px-2  text-center'/> */}
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AccountSetting