import React from 'react';
import AllPosts from '../Post/AllPosts';
import '../css/Feed.css';
import Post from '../Post/Post';
import StoryReel from './StoryReel';
import {useEffect, useState} from "react";
import axios from "axios";

import jQuery from "jquery";
import AllShares from "../Post/AllShares";

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
    const [shares, setShare] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getAllPosts/')
            .then(res => {
                setPosts(res.data);
            })
            .catch((err) => console.log(err))

    }, [])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getshare/')
            .then(res => {
                setShare(res.data);
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }, [])



    return (<
        div className="feed">
        <
            StoryReel/>
            <Post/> {
                posts.map((post) => {
                    return < >
                        <
                            AllPosts
                            profilePic={post.user.pic}
                            post_id={post.id}
                            message={post.postcontent}
                            timestamp={post.postdate}
                            username={post.user.first_name + ' ' + post.user.last_name}
                            image={post.post_photos}
                            comments={post.post_comments}
                            user_id={post.user.id}
                        /> </>
                })
            } {
                shares.map((share) => {
                    return < >
                        <AllShares
                            profilePic={share.user_pic_share}
                            username={share.username_share}
                            post_id={share.post_org_id}
                            post_user_org={share.user_org_pic}
                            username_org={share.post_username}
                            message={share.body_org}
                            timestamp={share.post_org_time}
                            image={share.pic}
                            timestamp_share={share.post_time_share}
                            // user_id={post.user.id}
                        /> </>
                })
            }</div>
)




}

export default Feed