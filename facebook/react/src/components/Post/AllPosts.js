import {useEffect, useState} from "react";
import * as React from 'react';
import {Avatar} from '@mui/material';
import './AllPosts.css';
import axios from "axios";
import jQuery from "jquery";
import Dialog from '@mui/material/Dialog';
import DialogContent from "@mui/material/DialogContent";
import theme from "./icons/theme.svg";
import smile from "./icons/smile.svg";


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


function AllPosts({post_id, profilePic, image, username, timestamp, message, comments}) {
    var like;
    var likeid;
    const [users, setUsers] = useState({})
    const [posts, setPosts] = useState({})
    const [share, setShare] = useState(null)

    const [scroll, setScroll] = useState('paper');
    const [open, setOpen] = useState(false);


    function submit(e) {
        const shares = {
            post: post_id,
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


        }).catch((err) => console.log(err))


    }

    const handleClickOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get/')
            .then(res => {
                setUsers(res.data[0]);
            })
            .catch((err) => console.log(err))
    }, [])
    const addlike = () => {
        const sentmessage = {
            post: post_id,
            user: users.id,
        }
        for (let i = 0; i <= posts.length - 1; i++) {
            let obj = posts[i]
            console.log(obj)
            if (obj.post === post_id && obj.user === users.id) {
                like = 'available'
                likeid = obj.id

            }
        }
        if (like === 'available') {

            axios.delete("http://127.0.0.1:8000/api/delete_like/" +
                likeid, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                },
            ).then(res => {
                console.log(res)
                setColor('')
            }).catch((err) => console.log(err))
        } else {
            axios.post("http://127.0.0.1:8000/api/get_like/",
                sentmessage, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                },
            ).then(res => {
                console.log(res)
                setColor('blue')

            }).catch((err) => console.log(err))
        }
    }
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get_likee/')
            .then(res => {
                setPosts(res.data);

            })
            .catch((err) => console.log(err))


    }, [])

    useEffect(() => {
        for (let i = 0; i <= posts.length - 1; i++) {
            let obj = posts[i]
            if (obj.post === post_id && obj.user === users.id) {

                setColor('blue')
            }
        }

    }, [post_id, users.id, posts]);

    const [colors, setColor] = useState('')


    const handleClose = () => {
        if (colors) {
            setColor('')
        } else {
            setColor('blue')
        }


    };

    const [comment, setComment] = useState(null)

    const sendCommentData = {
        post: parseInt(post_id),
        user: parseInt(users.id),
        commentcontent: comment
    }

    const addNewComment = () => {

        axios.post("http://127.0.0.1:8000/api/addcomment/",
            sendCommentData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')

                }
            },
        ).then(res => {
            console.log(res)

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
                    <Avatar src={profilePic} className="Posts_avatar"/>
                    <div className="Top_section_info">
                        <h3 style={{paddingLeft:"0px"}}> {username} </h3>
                        <p> {timestamp}</p>
                    </div>
                </div>
                <div className="bottom_section">
                    <p> {message} </p>
                </div>
                <div className="bottom_section_image row">
                    {
                        image.map((img) => {
                            return <>
                                <img src={img} className="col" alt=""/>
                            </>
                        })
                    }
                </div>
                <div className="nums-comments-iteractions">
                    <div className="interaction">
                        <i className="fa-solid fa-thumbs-up icon1"></i>
                        <i className="fa-solid fa-heart icon2"></i>
                        <i className="fa-regular fa-face-grin-beam icon3"> </i>
                        <a href="#"> </a>
                    </div>
                    <a href="#" class="nums-comments"> 100 Coments 20 Shares </a>
                </div>
                <div className="like-comment-share">
                    <div className="icon like">
                        <button onClick={addlike}><i onClick={handleClose}
                                                     className="fa-regular fa-thumbs-up"
                                                     style={
                                                         {color: colors}}> </i> Like
                        </button>
                    </div>
                    <div className="icon icon-comment">
                        <i className="fa-regular fa-comment"></i>
                        Comment
                    </div>
                    <div className="icon" onClick={handleClickOpenDialog}><i className="fa-solid fa-share"></i> Share
                    </div>
                </div>
                <div class="comments">
                    {
                        comments.map((comment) => {
                            return < >
                                <div className="comment">
                                    <img src={comment.split(',')[1]} alt=""/>
                                    <div className="comment-body">
                                        <p className="name"> {comment.split(',')[0]} </p>
                                        <p> {comment.split(',')[2]} </p>
                                    </div>
                                </div>
                            </>
                        })
                    }

                </div>
                <div className="create-comment">
                    <Avatar src={users.pic} className="Posts_avatar"/>
                    <input type="text"
                           placeholder="Write A comment"
                           className="commentInput"
                           name="commentcontent"
                           onChange={
                               (e) => setComment(e.target.value)}
                           onKeyDown={
                               (e) => handleKeyDown(e)}
                    />
                </div>
            </div>

            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                scroll={scroll}
            >
                <DialogContent dividers>

                    <div className="container" style={{overflowY: "auto"}}>
                        <div className="wrapper">
                            <section className="post">
                                <header>Share Post</header>
                                <form onSubmit={(e) => submit(e)} enctype="multipart/form-data">

                                    <div className="content">
                                        <img src={users.pic} alt="logo"/>
                                        <div className="details">
                                            <p>{users.first_name + ' ' + users.last_name}</p>
                                            <div className="privacy">
                                                <i className="fas fa-user-friends"></i>
                                                <span>Friends</span>
                                                <i className="fas fa-caret-down"></i>
                                            </div>

                                        </div>
                                    </div>
                                    <textarea
                                        placeholder={"What's on your mind, ?" + users.first_name}
                                        spellCheck="false"
                                        required
                                        name="postcontent"
                                        onChange={(e) => setShare(e.target.value)}
                                        style={{height: "50px"}}
                                    ></textarea>
                                    <img src={image} className="col" alt=""/>
                                    <button type='submit'>Post</button>


                                    <div className="theme-emoji">
                                        <img src={theme} alt="theme"/>
                                        <img src={smile} alt="smile"/>
                                    </div>


                                </form>

                            </section>

                        </div>

                    </div>

                </DialogContent>
            </Dialog>
        </>

    )
}

export default AllPosts