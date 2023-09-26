import React, { useEffect, useState } from 'react'
const url = "https://chatting-backend-whgy.onrender.com"

const SearchItem = ({ user }) => {
    const [friend, setFriend] = useState({});
    const [searchTerm , setSearchTerm] = useState(true)
    // console.log(user)
    useEffect(()=>{
        setFriend({ ...friend, name: user?.name, email: user?.email, dob: user?.dob, gender: user?.gender, username: user?.username })
        if(user?.username===undefined){
            setSearchTerm(false);
        }else{
            setSearchTerm(true);
        }
        // console.log(user?.username);
    },[user])
    // const checkFriend= async ()=>{
    //     const response = await()
    // }
    const handleAddFriend = async () => {
        console.log(friend);
        const {name, email, dob, gender, username} = friend;
        const response = await fetch(`${url}/api/friends/addFriend`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ name, email, dob, gender, username })
        });
        const json = await response.json();
        console.log(json);
        if(json.status==="created"){
            return setSearchTerm(false)
        }
    }
    // console.log(user) 
    
    return (
        <>  {searchTerm &&
            <div className={`flex bg-[#373E4E] h-14 rounded-3xl w-full items-center justify-between px-2`}>
                <div className="w-11 h-11 rounded-full bg-red-300 "></div>
                <div className=" w-[50%]">
                    <div className="text-xl">{user?.username}</div>
                    <div className="text-sm opacity-50"></div>
                </div>
                <div onClick={handleAddFriend} className="text-sm opacity-50 cursor-pointer">Add Friend</div>
            </div>
            }
        </>
    )
}

export default SearchItem