import React from 'react';
import AllPosts from '../Post/AllPosts';
import '../css/Feed.css';
import Post from '../Post/Post';
import StoryReel from './StoryReel';
import {useEffect, useState} from "react";
import axios from "axios";
import jQuery from "jquery";

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function Feed() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getAllPosts/')
            .then(res => {
                setPosts(res.data);
            })
            .catch((err) => console.log(err))

    }, [])



    return (<
        div className="feed">
        <
            StoryReel/>
            <
                Post/> {
                posts.map((post) => {
                    return < >
                        <
                            AllPosts profilePic={post.user.pic}
                                     post_id={post.id}
                                     message={post.postcontent}
                                     timestamp={post.postdate}
                                     username={post.user.first_name + ' ' + post.user.last_name}
                                     image={post.post_photos}
                                     comments={post.post_comments}
                                     user_id={post.user.id}
                        /> < /
                >
                })
            }</div>
)

}

export default Feed