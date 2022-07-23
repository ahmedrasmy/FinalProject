import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import CreatePost from '../Post/CreatePost';
import Post from '../Post/Post';
import ProfileHeader from './UserProfileHeader';
import Header from '../Header/Header';
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useState} from "react";
import axios from "axios";

function Profile() {
    const [users, setUsers] = useState({})
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get/')
            .then(res => {
                setUsers(res.data[0]);
            })
            .catch((err) => console.log(err))
    }, [])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getProfilePosts/')
            .then(res => {
                setPosts(res.data);
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <Header/>
            <div className="h-screen">
                <div className="mt-1 shadow bg-white h-screen" style={{marginTop: '1rem !important'}}>
                    {/* PROFILE HEADER */}
                    <ProfileHeader/>
                    {/* END PROFILE HEADER */}
                    {/* // CONTENT */}
                    <div>
                        <div className='bg-gray-100 '>
                            <div className="flex justify-center h-screen">
                                {/* LEFT */}
                                <div>
                                    {/* // INTRO */}
                                    <div className="mr-12 mt-4">
                                        <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
                                            <h1 className="font-bold text-xl">Intro</h1>
                                        </div>
                                    </div>
                                    {/* // END INTRO */}
                                    {/* // PHOTOS */}
                                    <div className="mr-12 mt-4">
                                        <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
                                            <div className="flex justify-between">
                                                <h1 className="font-bold text-xl">Photos</h1>
                                                <a href="#" className="text-lg text-blue-700">See All Photos</a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* // END PHOTOS */}

                                    {/* // FRIENDS */}
                                    <div className="mr-12 mt-4">
                                        <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
                                            {/* Header */}
                                            <div className="flex justify-between">
                                                <h1 className="font-bold text-xl">Friends</h1>
                                                <Link to="/friends/myId"
                                                    className="text-lg text-blue-700 hover:bg-blue-200">See All
                                                    Friends</Link>
                                            </div>
                                            {/* List */}
                                            <div className="">
                                                <p className="text-base text-gray-400">1000 friends</p>
                                                <div className="grid grid-cols-3 gap-1">
                                                    <div className="bg-white p-0.5">
                                                        <img src="./images/profile_photo_cat.jpg"
                                                            className="w-24 h-24 rounded-md mt-2 cursor-pointer"
                                                        />
                                                        <Link to={`/profile/friendId`}
                                                            className="font-semibold text-sm">Friend FullName</Link>
                                                    </div>
                                                    <div className="bg-white p-0.5">
                                                        <img src="./images/profile_photo_cat.jpg"
                                                            className="w-24 h-24 rounded-md mt-2 cursor-pointer"
                                                        />
                                                        <Link to={`/profile/friendId`}
                                                            className="font-semibold text-sm">Friend FullName</Link>
                                                    </div>
                                                    <div className="bg-white p-0.5">
                                                        <img src="./images/profile_photo_cat.jpg"
                                                            className="w-24 h-24 rounded-md mt-2 cursor-pointer"
                                                        />
                                                        <Link to={`/profile/friendId`}
                                                            className="font-semibold text-sm">Friend FullName</Link>
                                                    </div>
                                                    <div className="bg-white p-0.5">
                                                        <img src="./images/profile_photo_cat.jpg"
                                                            className="w-24 h-24 rounded-md mt-2 cursor-pointer"
                                                        />
                                                        <Link to={`/profile/friendId`}
                                                            className="font-semibold text-sm">Friend FullName</Link>
                                                    </div>
                                                    <div className="bg-white p-0.5">
                                                        <img src="./images/profile_photo_cat.jpg"
                                                            className="w-24 h-24 rounded-md mt-2 cursor-pointer"
                                                        />
                                                        <Link to={`/profile/friendId`}
                                                            className="font-semibold text-sm">Friend FullName</Link>
                                                    </div>
                                                    <div className="bg-white p-0.5">
                                                        <img src="./images/profile_photo_cat.jpg"
                                                            className="w-24 h-24 rounded-md mt-2 cursor-pointer"
                                                        />
                                                        <Link to={`/profile/friendId`}
                                                            className="font-semibold text-sm">Friend FullName</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* // END FRIENDS */}
                                </div>
                                {/* END LEFT */}

                                {/* // POST LIST */}
                                <div className="w-2/5">
                                    {/* CREATE POST */}

                                    <CreatePost name={users.first_name + ' ' + users.last_name} picture={users.pic}/>
                                    {/* END CREATE POST */}


                                    {
                                        posts.map((post) => (
                                            <Post name={users.first_name + ' ' + users.last_name} picture={users.pic} post={post} />
                                        ))
                                    }
                                    {/* END POST */}
                                </div>
                                {/* // END POST LIST */}
                            </div>
                        </div>
                    </div>
                    {/* // END CONTENT */}
                </div>
            </div>
        </>
    )
}

export default Profile