import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AllPosts from '../Post/AllPosts';
import ProfileHeader from './ProfileHeader';
import Header from '../Header/Header';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../Post/Post";
import {useSelector} from "react-redux";

function Profile() {
    let location = useLocation();
    const postall = useSelector((state) => state.PostReducer.Posts)
    const comment = useSelector((state) => state.commentreducer.Comment)
    let id = location.pathname.split('/')[3]
    const [users, setUsers] = useState({})
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get_one_user/' + id)
            .then(res => {
                setUsers(res.data[0]);
            })
            .catch((err) => console.log(err))
    }, [id])
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get_one_user_Posts/' + id)
            .then(res => {
                setPosts(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err))
<<<<<<< HEAD
    }, [id,postall,comment])
=======
    }, [id])
>>>>>>> 396daafe6695eefafbe1b17d9014f72a37432860

    const [friends, setfriends] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/friends_list/' + id)
            .then(res => {
                setfriends(res.data);
            })
            .catch((err) => console.log(err))
    }, [id])
<<<<<<< HEAD
=======

>>>>>>> 396daafe6695eefafbe1b17d9014f72a37432860


    return (
        <>
            <Header/>
            <div className="h-screen">
                <div className="mt-1 shadow bg-white h-screen" style={{ marginTop: '1rem !important' }}>
                    {/* PROFILE HEADER */}
<<<<<<< HEAD
                    <div className="row" style={{width: '100%'}}>
                        <ProfileHeader/>
=======
                    <div className="row" style={{ width: '100%' }}>
                        <ProfileHeader />
>>>>>>> 396daafe6695eefafbe1b17d9014f72a37432860
                    </div>

                    {/* END PROFILE HEADER */}
                    {/* // CONTENT */}
                    <div className='bg-gray-100 '>
                        <div className="flex justify-center h-screen">
                            {/* LEFT */}
                            <div>
                                {/* // PHOTOS */}
                                <div className="mr-12 mt-4">
                                    <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
                                        <div className="flex justify-between">
                                            <h1 className="font-bold text-xl">Photos</h1>
<<<<<<< HEAD
                                        </div>
                                        <div className="" style={{maxHeight: '500px'}}>
                                            <div className="grid grid-cols-3 gap-1">
                                                {
                                                    posts.slice(0, 7).map((post, index) => {
                                                        return <>
                                                            {post.post_photos.slice(0, 2).map((img) => {
                                                                    return <>
                                                                        <div className="bg-white p-0.5">
                                                                            <img src={img}
                                                                                 className="w-24 h-24 rounded-md mt-2 cursor-pointer"/>
                                                                        </div>
                                                                    </>
                                                                }
                                                            )}
                                                        </>
                                                    })
                                                }
                                            </div>
                                        </div>
=======
                                        </div>
                                        <div className="" style={{ maxHeight: '500px' }}>
                                            <div className="grid grid-cols-3 gap-1">
                                                {
                                                    posts.slice(0, 7).map((post, index) => {
                                                        return <>
                                                            {post.post_photos.slice(0, 2).map((img) => {
                                                                return <>
                                                                    <div className="bg-white p-0.5">
                                                                        <img src={img} className="w-24 h-24 rounded-md mt-2 cursor-pointer" />
                                                                    </div>
                                                                </>
                                                            }
                                                            )}
                                                        </>
                                                    })
                                                }
                                            </div>
                                        </div>
>>>>>>> 396daafe6695eefafbe1b17d9014f72a37432860
                                    </div>
                                </div>
                                {/* // END PHOTOS */}

                                {/* // FRIENDS */}
                                <div className="mr-12 mt-4">
                                    <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
                                        {/* Header */}
                                        <div className="flex justify-between">
                                            <h1 className="font-bold text-xl">Friends</h1>
                                        </div>
                                        {/* List */}
<<<<<<< HEAD
                                        <div className="" style={{maxHeight: '500px'}}>
=======
                                        <div className="" style={{ maxHeight: '500px' }}>
>>>>>>> 396daafe6695eefafbe1b17d9014f72a37432860
                                            <p className="text-base text-gray-400">{(users['friends']) === 0 ? <> </>
                                                : <>{users['friends']}</>
                                            }</p>
                                            <div className="grid grid-cols-3 gap-1">
                                                {
                                                    friends.slice(0, 7).map((friend, index) => {
                                                        return <>
                                                            <div className="bg-white p-0.5">
                                                                <img src={friend.pic}
<<<<<<< HEAD
                                                                     className="w-24 h-24 rounded-md mt-2 cursor-pointer"
                                                                />
                                                                <Link to={`/home/pro/` + friend.id}

                                                                      className="font-semibold text-sm">{friend.first_name + " " + friend.last_name}</Link>
=======
                                                                    className="w-24 h-24 rounded-md mt-2 cursor-pointer"
                                                                />
                                                                <Link to={`/home/pro/` + friend.id}

                                                                    className="font-semibold text-sm">{friend.first_name + " " + friend.last_name}</Link>
>>>>>>> 396daafe6695eefafbe1b17d9014f72a37432860
                                                            </div>
                                                        </>
                                                    })
                                                }
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
                                {users['is_self'] ?
<<<<<<< HEAD
                                    <Post/>
=======
                                    <Post />
>>>>>>> 396daafe6695eefafbe1b17d9014f72a37432860
                                    : null}
                                {/* END CREATE POST */}
                                {
                                    posts.map((post) => {
                                        return <>
                                            <AllPosts
                                                profilePic={post.user.pic}
                                                post_id={post.id}
                                                message={post.postcontent}
                                                timestamp={post.postdate}
                                                username={post.user.first_name + ' ' + post.user.last_name}
                                                image={post.post_photos}
                                                comments={post.post_comments}
                                                users={users}
                                            />
                                        </>
                                    })
                                }
                                {/* END POST */}
                            </div>
                        </div>
                        {/* // END POST LIST */}
                    </div>
                    {/* // END CONTENT */}
                </div>
            </div>
        </>
    )
}

export default Profile