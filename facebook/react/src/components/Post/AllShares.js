import { useEffect, useState } from "react";
import * as React from 'react';
import { Avatar, IconButton } from '@mui/material';
import './AllPosts.css';
import axios from "axios";
import jQuery from "jquery";
import Dialog from '@mui/material/Dialog';
import DialogContent from "@mui/material/DialogContent";
import theme from "./icons/theme.svg";
import smile from "./icons/smile.svg";
import love3 from "../images/love3.svg";
import care from "../images/care.png";
import emotion4 from "../images/emotion4.webp";
import emotion5 from "../images/emotion5.webp";
import emotion6 from "../images/emotion6.webp";
import emotion7 from "../images/emotion7.webp";
import love from '../images/loved.PNG';
import liked from '../images/liked.PNG';
import haha from '../images/hahaed.PNG';
import sadded from '../images/saded.PNG';
import angry from '../images/angred.PNG';
import wow from '../images/wowed.PNG';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../Store/action/User';

import {
    deletelikereducer,
    deletereducer,
    likeereducer,
    sharecommentreducer,
    sharelikereducer,
    sharereducer
} from "../../Store/action/Posts";


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
function renderTimestamp(timestamp) {
    let prefix = "";
    const timeDiff = Math.round(
        (new Date().getTime() - new Date(timestamp).getTime()) / 60000
    );
    if (timeDiff < 1) {
        // less than one minute ago
        prefix = "just now...";
    } else if (timeDiff < 60 && timeDiff > 1) {
        // less than sixty minutes ago
        prefix = `${timeDiff} minutes ago`;
    } else if (timeDiff < 24 * 60 && timeDiff > 60) {
        // less than 24 hours ago
        prefix = `${Math.round(timeDiff / 60)} hours ago`;
    } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
        // less than 7 days ago
        prefix = `${Math.round(timeDiff / (60 * 24))} days ago`;
    } else {
        prefix = `${new Date(timestamp)}`;
    }
    return prefix;
}



function AllShares({ post_id, profilePic, image, username, timestamp, post_user_org, username_org, message, timestamp_share, comments,users,orpost_id }) {


    var likeid;
    const [posts, setPosts] = useState({})
    const [likes, setLike] = useState([])
    const [userLike, setUserLike] = useState(0)
    const [Icon, setIcon] = useState(0)
    const [dbIcon, setdbIcon] = useState(0)
    var like;
    const [share, setShare] = useState(null)
    const [scroll, setScroll] = useState('paper');
    const [open, setOpen] = useState(false);

     const likess = useSelector((state) => state.likereducer.LIKES_SHARE)



    function submit(e) {
        const shares = {
            post: orpost_id,
            user: users.id,
        }
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/addshare/",
            shares, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        },
        ).then(res => {
            console.log(res)

            dispatch(sharereducer(1))

            handleCloseDialog()

        }).catch((err) => console.log(err))
    }

    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    const addlike = (e) => {
        const sentmessage = {
            post: parseInt(post_id),
            user: parseInt(users.id),
            iconId: parseInt(e),
        }
        console.log(sentmessage)
        axios.post("http://127.0.0.1:8000/api/get_like_share/",
            sentmessage, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        },
        ).then(res => {
            for (let i = 0; i <= res.data.length - 1; i++) {
                let obj = res.data[i]
                if (obj.post === post_id && obj.user === users.id) {
                    likeid = obj.id
                    setPosts(res.data)
                    setIcon(obj.iconId)
                    setColor('blue')
                    setUserLike(1)

                     dispatch(sharelikereducer(1))

                }
            }
        }).catch((err) => console.log(err))
    }
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get_likee_share/')
            .then(res => {
                setPosts(res.data);
            })
            .catch((err) => console.log(err))

    }, [likess])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get_likee_user_share/' + post_id)
            .then(res => {
                setLike(res.data);
            })
            .catch((err) => console.log(err))

    }, [likess])


    useEffect(() => {
        for (let i = 0; i <= posts.length - 1; i++) {
            let obj = posts[i]
            if (obj.post === post_id && obj.user === users.id) {
                setIcon(obj.iconId)
                setColor('blue')
                setUserLike(1)
            }
        }
    }, [post_id, users.id, posts]);
    const [colors, setColor] = useState('')
    const handleClose = () => {
        setColor('')
        setUserLike(0)
        setIcon(0)
        for (let i = 0; i <= posts.length - 1; i++) {
            let obj = posts[i]
            if (obj.post === post_id && obj.user === users.id) {
                likeid = obj.id
            }
        }
        axios.delete("http://127.0.0.1:8000/api/delete_like_share/" +
            likeid, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        },
        ).then(res => {
            setColor('')
            setUserLike(0)
            setIcon(0)

            dispatch(deletelikereducer(1))

        }).catch((err) => console.log(err))
    };
    const [comment, setComment] = useState(null)
    const sendCommentData = {
        post: parseInt(post_id),
        user: parseInt(users.id),
        commentcontent: comment
    }
    const addNewComment = () => {
        axios.post("http://127.0.0.1:8000/api/addcommentshare/",
            sendCommentData, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        },
        ).then(res => {

              dispatch(sharecommentreducer(1))

        }).catch((err) => console.log(err))
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addNewComment()
            e.target.value = ""
        }
    }
    return (
        <>
            <div className="all_posts">
                <div className="Top_section">

                    <Avatar src={profilePic} className="Posts_avatar" />

                    <div className="Top_section_info">
                        <h3 style={{ paddingLeft: "0px" }}> {username} </h3>
                        <p> {renderTimestamp(timestamp_share)} </p>

                    </div>

                </div>

                <div className="Top_section" style={{ marginLeft: "40px" }}>
                    <Avatar src={post_user_org} className="Posts_avatar" />
                    <div className="Top_section_info">
                        <h3 style={{ paddingLeft: "0px" }}> {username_org} </h3>
                        <p> {renderTimestamp(timestamp)} </p>

                    </div>
                </div>
                <div className="bottom_section">

                    <p style={{marginLeft:"40px"}}> {message} </p>

                </div>
                <div className="bottom_section_image row"> {
                    image.map((img) => {
                        return <>
                            <img src={img} className="col" alt="" />
                        </>
                    })
                } </div>
                <
                    div className="nums-comments-iteractions">
                    <div className="interaction">
                        {
                            likes.map((like) => {
                                return < >

                                    {
                                        like['iconId'] === 0 ?
                                            <div style={{ display: "inline" }} >
                                                {like['dcount']} <img src={liked} alt="Img" style={{ display: "inline" }} />

                                            </div> :
                                            null

                                    }
                                    {
                                        like['iconId'] === 1 ?
                                            <div style={{ display: "inline" }} >
                                                {/*<i className="fa-solid fa-heart icon2"> < /i>*/}
                                                {like['dcount']}   <img src={love} style={{ display: "inline" }} alt="Img" />
                                            </div> :
                                            null

                                    }
                                    {
                                        like['iconId'] === 2 ?
                                            <div style={{ display: "inline" }} >
                                                {like['dcount']}  <img src={care} style={{ display: "inline", maxWidth: "20px" }} alt="Img" />
                                            </div> :
                                            null

                                    }
                                    {
                                        like['iconId'] === 3 ?
                                            <div style={{ display: "inline" }} >
                                                {like['dcount']}  <img src={haha} style={{ display: "inline" }} alt="Img" />
                                            </div> :
                                            null

                                    }
                                    {
                                        like['iconId'] === 4 ?
                                            <div style={{ display: "inline" }} >
                                                {like['dcount']}  <img src={wow} style={{ display: "inline" }} alt="Img" />
                                            </div> :
                                            null

                                    }
                                    {
                                        like['iconId'] === 5 ?
                                            <div style={{ display: "inline" }} >
                                                {like['dcount']}  <img src={sadded} style={{ display: "inline" }} alt="Img" />
                                            </div> :
                                            null

                                    }
                                    {
                                        like['iconId'] === 6 ?
                                            <div style={{ display: "inline" }} >
                                                {like['dcount']}  <img src={angry} style={{ display: "inline" }} alt="Img" />
                                            </div> :
                                            null

                                    }

                                </>
                            })
                        }

                        <
                            a href="#"> </a></div>
                    <
                        a href="#"
                        class="nums-comments"> {comments.length}
                        Coments </a></div>
                <
                    div className="like-comment-share">
                    <
                        div className="icon like"> {
                            userLike === 1 ? <> {
                                Icon === 0 ?
                                    <
                                        IconButton onClick={handleClose}>
                                        <
                                            i className="fa-regular fa-thumbs-up"
                                            style={
                                                { color: colors }}>
                                        </i>
                                        Like </IconButton> :
                                    null
                            } {
                                    Icon === 1 ?
                                        <
                                            IconButton onClick={handleClose}>
                                            <
                                                img src={love3}
                                                class="love icon2"
                                                alt="" style={{ height: "50px" }} />
                                        </IconButton> : null} {Icon === 2 ? <
                                            IconButton onClick={handleClose}>
                                            <
                                                img src={care}
                                                class="icon3"
                                                alt=""
                                                style={{ height: "50px" }} />
                                        </IconButton> : null
                                } {
                                    Icon === 3 ?
                                        <
                                            IconButton onClick={handleClose}>
                                            <
                                                img src={emotion4}
                                                class="icon4"
                                                alt="" style={{ height: "50px" }} />
                                        </IconButton> : null} {Icon === 4 ? <
                                            IconButton onClick={handleClose}>
                                            <
                                                img src={emotion5}
                                                class="icon5"
                                                alt="" style={{ height: "50px" }} />
                                        </IconButton> : null} {Icon === 5 ? <
                                            IconButton onClick={handleClose}>
                                            <
                                                img src={emotion6}
                                                class="icon6"
                                                alt="" style={{ height: "50px" }} />
                                        </IconButton> : null
                                } {
                                    Icon === 6 ?

                                        <
                                            IconButton onClick={handleClose}>
                                            <
                                                img src={emotion7}
                                                class="icon7"
                                                alt="" style={{ height: "50px" }} />
                                        </IconButton> : null
                                }
                            </> : <>
                                <
                                    IconButton id="0">
                                    <
                                        i className="fa-regular fa-thumbs-up"> </i>Like </IconButton>
                                <
                                    div class="emoji">
                                    <i id="0"
                                        onClick={
                                            (e) => addlike(0)}
                                        class="fa-solid fa-thumbs-up icon1"></i>
                                    <i id="1"
                                        onClick={
                                            (e) => addlike(1)
                                        }> < img src={love3}
                                            class="love icon2"
                                            alt="" /> </i> <
                                                i id="2"
                                                onClick={
                                                    (e) => addlike(2)
                                                }> < img src={care}
                                                    class="icon3"
                                                    alt="" /> </i> <
                                                        i id="3"
                                                        onClick={
                                                            (e) => addlike(3)
                                                        }> < img src={emotion4}
                                                            class="icon4"
                                                            alt="" /> </i> <
                                                                i id="4"
                                                                onClick={
                                                                    (e) => addlike(4)
                                                                }> < img src={emotion5}
                                                                    class="icon5"
                                                                    alt="" /> </i> <
                                                                        i id="5"
                                                                        onClick={
                                                                            (e) => addlike(5)
                                                                        }> < img src={emotion6}
                                                                            class="icon6"
                                                                            alt="" /> </i> <
                                                                                i id="6"
                                                                                onClick={
                                                                                    (e) => addlike(6)
                                                                                }> < img src={emotion7}
                                                                                    class="icon7"
                                                                                    alt="" /> </i></div>
                            </>
                        } </div>
                    <
                        div className="icon icon-comment">
                        <
                            i className="fa-regular fa-comment"> </i>
                        Comment
                    </div>
                    <
                        div className="icon">< i className="fa-solid fa-share"
                            onClick={handleClickOpenDialog}> </i> Share
                    </div>


                </div>
                <div class="comments"> {
                    comments.map((comment) => {
                        return <>
                            <div className="comment">
                                <img src={comment.split(',')[1]}
                                    alt="" />
                                <div className="comment-body">
                                    <
                                        p className="name"> {comment.split(',')[0]} </p>
                                    <p> {comment.split(',')[2]} </p></div>
                            </div>
                        </>
                    })
                }

                </div>
                <div className="create-comment">
                    <Avatar src={users.pic}
                        className="Posts_avatar" />
                    <
                        input type="text"
                        placeholder="Write A comment"
                        className="commentInput"
                        name="commentcontent"
                        onChange={
                            (e) => setComment(e.target.value)
                        }
                        onKeyDown={
                            (e) => handleKeyDown(e)
                        } /></div>
            </div>

            <Dialog open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                scroll={scroll}>
                <
                    DialogContent dividers>

                    <
                        div className="container"
                        style={
                            { overflowY: "auto" }
                        }>
                        <
                            div className="wrapper">
                            <
                                section className="post">
                                <
                                    header> Share Post
                                </header>
                                <
                                    form onSubmit={
                                        (e) => submit(e)
                                    }
                                    enctype="multipart/form-data">

                                    <
                                        div className="content">
                                        <
                                            img src={users.pic}
                                            alt="logo" />
                                        <
                                            div className="details">
                                            <
                                                p> {users.first_name + ' ' + users.last_name} </p>
                                            <
                                                div className="privacy">
                                                <
                                                    i className="fas fa-user-friends"> </i> <
                                                        span> Friends </span> <
                                                            i className="fas fa-caret-down"> </i></div>

                                        </div>
                                    </div>
                                    <
                                        img src={image}
                                        className="col"
                                        alt=""
                                        style={
                                            { marginTop: "10px", marginRight: "20px" }}
                                    />
                                    <button type="submit"
                                        className="bg-blue-600  rounded-lg text-white font-semibold">
                                        Share
                                    </button>
                                    <
                                        div className="theme-emoji">
                                        <
                                            img src={theme}
                                            alt="theme" />
                                        <
                                            img src={smile}
                                            alt="smile" />
                                    </div>


                                </form>

                            </section>

                        </div>

                    </div>

                </DialogContent> </Dialog>

        </ >


    )
}

export default AllShares