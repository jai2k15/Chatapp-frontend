import React, { useEffect, useState } from 'react'
import UserItem from './UserItem'
import SearchItem from './SearchItem';

const Users = ({ selectedChat, setSelectedChat, setUsers, onlineUsers, notifyMessage, setNotifyMessages }) => {
    const [showTitle, setShowTitle] = useState('flex');
    const [userItem, setUserItem] = useState('flex');
    const [searchTransition, setSearchTransition] = useState('scale-0')
    const [username, setUsername] = useState('');
    const [user, setUser] = useState({});
    const [searchTerm, setSearchTerm] = useState(true)
    const [friends, setFriends] = useState([]);
    const [friend, setFriend] = useState([]);
const url = "https://chatting-backend-whgy.onrender.com"

    const toggleSearch = () => {
        if (searchTransition === "scale-0") {
            setSearchTransition('scale-x-100');
            setShowTitle('hidden');

        } else {
            setSearchTransition("scale-0");
            setShowTitle('flex')
        }
    }
    const showFriends = async () => {
        const response = await fetch(`${url}/api/friends/allFriends`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`
            },

        });
        const json = await response.json();

        setFriend(json.friend);

        setUsers(friend);

        setFriends({ ...friends, friend })
    }
    let users = onlineUsers.map((user) => { //online username
        return user.username;
    })
    useEffect(() => {
        // console.log(notifyMessage)
    }, [])
    const onChange = (e) => {
        setUsername((e.target.value).toLowerCase())
    }
    // console.log(fru)
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (!username) return
        const response = await fetch(`${url}/api/user/searchUser`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ username })
        });
        const json = await response.json();
        setUser(json);

        friend.forEach((value, index) => {
            try {
                let createdBy = friends.friend[index]?.createdBy;
            } catch (err) {
                console.log(err)
            }
            if ((friend[index]?.username === username && createdBy === localStorage.getItem("id")) || user === null || username === null || username === localStorage.getItem("username")) {
                return setSearchTerm(false)
            }
            setSearchTerm(true);
        })
    }

    useEffect(() => {
        // console.log(notifyMessage)
        showFriends();
    }, [friends])

    // const userActive = onlineUsers.find((user) => user.username === localStorage.getItem('username'));

    return (
        <>
            <div className=' bg-[#373E4E] w-1/4 rounded-2xl h-full p-4 space-y-6'>
                <div className='flex items-center justify-between space-x-10'>
                    <div className='bg-green-400  flex items-center flex-col' >
                        <div className='hidden'>
                            request
                        </div>
                        <div className="hidden absolute w-40 h-40 bg-red-300 my-6"></div>

                    </div>
                    <div>
                        <h1 className={` text-3xl font-bold ${showTitle}`}>Friends</h1>
                    </div>
                    <div className=' flex items-center cursor-pointer space-x-2  max-w-[80%]'>
                        <form onSubmit={handleSearchSubmit}>
                            <input htmlFor='username' onChange={onChange} type="text" className={` flex transition ease-linear duration-1000 bg-[#1B202D] outline-none h-10 rounded-xl p-2 ${searchTransition}`} />
                        </form>
                        <svg onClick={toggleSearch} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                        </svg>

                    </div>
                </div>
                <div className='scroll bg-[#1B202D] w-full h-[90%] rounded-xl px-2 py-4 space-y-4 overflow-y-auto'>
                    {searchTerm &&
                        <SearchItem user={user} />
                    }
                    {friend?.map((friend) => {
                        return <UserItem setNotifyMessages={setNotifyMessages} notifyMessage={notifyMessage} selectedChat={selectedChat} checkOnline={users.some(element => { return friend?.username.includes(element) })} setSelectedChat={setSelectedChat} key={friend._id} friend={friend} userItem={userItem} />
                    })}



                </div>
            </div>
            {/* 
                let users = ['jai', 'admin'];
                console.log(users('jai'))
            */}
        </>
    )
}

export default Users