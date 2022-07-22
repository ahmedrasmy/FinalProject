import React from 'react';
import AllPosts from './AllPosts';
import '../css/Feed.css';
import Post from './Post';
import StoryReel from './StoryReel';
import {useEffect, useState} from "react";
import axios from "axios";
function Feed() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getAllPosts/')
            .then(res => {
                setPosts(res.data);
            })
            .catch((err) => console.log(err))
    }, [])
    console.log(posts)
    return (
        <div className="feed">
            <StoryReel/>
            <Post/>
            {
                posts.map((post) => {
                return <>
                    <AllPosts profilePic={post.user.pic}
                        message={post.postcontent}
                        timestamp={post.postdate}
                        username={post.user.first_name + ' ' + post.user.last_name}
                        image = {post.post_photos}
                        />
                    </>
                })
            }   
        </div>
    )

}

export default Feed