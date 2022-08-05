import React from 'react';
import AllPosts from '../Post/AllPosts';
import '../css/Feed.css';
import Post from '../Post/Post';
import StoryReel from './StoryReel';
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../Store/action/User';
import jQuery from "jquery";
import AllShares from "../Post/AllShares";
import { Likee } from "../../Store/action/LIkee";

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
    const users = useSelector((state) => state.UserReducer.direc)
    const comment = useSelector((state) => state.commentreducer.Comment)
    const Shares = useSelector((state) => state.sharereducer.Share)
    const postall = useSelector((state) => state.PostReducer.Posts)
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getAllPosts/')
            .then(res => {
                setPosts(res.data);
            })
            .catch((err) => console.log(err))
    }, [postall, comment])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getshare/')
            .then(res => {
                setShare(res.data);
            })
            .catch((err) => console.log(err))
    }, [Shares])
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(User())
    }, [])
    useEffect(() => {
        dispatch(Likee())
    }, [])
    return (
        <div className="feed">
            <StoryReel />
            <Post /> {
                posts.map((post) => {
                    return < >
                        <AllPosts
                            profilePic={post.user.pic}
                            post_id={post.id}
                            message={post.postcontent}
                            timestamp={post.postdate}
                            username={post.user.first_name + ' ' + post.user.last_name}
                            image={post.post_photos}
                            comments={post.post_comments}
                            users={users}
                        /> </>
                })
            } {
                shares.map((share) => {
                    return < >
                        <AllShares
                            profilePic={share.user_pic_share}
                            username={share.username_share}
                            post_id={share.post_id_share}
                            post_user_org={share.user_org_pic}
                            username_org={share.post_username}
                            message={share.body_org}
                            timestamp={share.post_org_time}
                            image={share.pic}
                            timestamp_share={share.post_time_share}
                            comments={share.comments}
                        /> </>
                })
            }</div>
    )




}

export default Feed