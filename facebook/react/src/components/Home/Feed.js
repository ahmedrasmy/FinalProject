import React from 'react';
import AllPosts from '../Post/AllPosts';
import '../css/Feed.css';
import Post from '../Post/Post';
import StoryReel from './StoryReel';
import { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import {useDispatch, useSelector} from 'react-redux';
import {User} from '../../Store/action/User';
import AllShares from "../Post/AllShares";
import {Likee} from "../../Store/action/LIkee";




=======
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../Store/action/User';
import jQuery from "jquery";
import AllShares from "../Post/AllShares";
import { Likee } from "../../Store/action/LIkee";
>>>>>>> 396daafe6695eefafbe1b17d9014f72a37432860



function Feed() {
    const [posts, setPosts] = useState([])
    const [shares, setShare] = useState([])
<<<<<<< HEAD
    const postall = useSelector((state) => state.PostReducer.Posts)
    const users = useSelector((state) => state.UserReducer.direc)
    const comment = useSelector((state) => state.commentreducer.Comment)
    const commentshare = useSelector((state) => state.commentreducer.Share)
    const Shares = useSelector((state) => state.sharereducer.Share)
    const dispatch = useDispatch();
=======
    const users = useSelector((state) => state.UserReducer.direc)
    const comment = useSelector((state) => state.commentreducer.Comment)
    const Shares = useSelector((state) => state.sharereducer.Share)
    const postall = useSelector((state) => state.PostReducer.Posts)
>>>>>>> 396daafe6695eefafbe1b17d9014f72a37432860
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getAllPosts/')
            .then(res => {
                setPosts(res.data);
            })
            .catch((err) => console.log(err))
    }, [postall, comment])
<<<<<<< HEAD


    useEffect(() => {
        dispatch(User())
    }, [])
    useEffect(() => {
        dispatch(Likee())
    }, [])


    useEffect(() => {
            axios.get('http://127.0.0.1:8000/api/getshare/')
                .then(res => {
                    setShare(res.data);
                })
                .catch((err) => console.log(err))

        },
        [Shares, commentshare]
    )

    return (
        <div className="feed">
            <StoryReel/>
            <Post/> {
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
=======
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
>>>>>>> 396daafe6695eefafbe1b17d9014f72a37432860

                    /> </>
            })
        } {
            shares.map((share) => {
                return < >
                    <AllShares
                        profilePic={share.user_pic_share}
                        username={share.username_share}
                        post_id={share.post_id_share}
                        orpost_id={share.post_org_id}
                        post_user_org={share.user_org_pic}
                        username_org={share.post_username}
                        message={share.body_org}
                        timestamp={share.post_org_time}
                        image={share.pic}
                        timestamp_share={share.post_time_share}
                        comments={share.comments}
                        users={users}
                    /> </>
            })
        }</div>

)



}

export default Feed