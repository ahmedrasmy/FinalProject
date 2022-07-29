import React from 'react'
import Header from '../Header/Header';
import Sidebar from './Sidebar';
import Contacts from './Contacts';
import '../css/Home.css';
import '../css/Feed.css';
import {useEffect, useState} from "react";
import axios from "axios";
import AllPosts from '../Post/AllPosts';
import {useLocation} from "react-router-dom";
function Post2() {
    let location = useLocation();
    let id = location.pathname.split('/')[3]
    console.log(id)
    const [post, setPost] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get_one_post/'+id)
            .then(res => {
                setPost(res.data[0]);
                console.log(res)
                console.log(res.data)

            })
            .catch((err) => console.log(err))
    }, [])
    console.log(post)
    return (
        <div className="home">
            <Header/>
            <div className="home_body">
                <Sidebar/>
                <div className="feed">



                                <
                                    AllPosts profilePic={post.user.pic}
                                            post_id={post.id}
                                            message={post.postcontent}
                                            timestamp={post.postdate}
                                            username={post.user.first_name + ' ' + post.user.last_name}
                                            image={post.post_photos}
                                            comments={post.post_comments}
                                            user_id={post.user.id}
                                />


                </div>
                <Contacts/>
            </div>
        </div>
    )
}

export default Post2