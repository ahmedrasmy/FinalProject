import { useState, useEffect } from "react";
import React from 'react';
import theme from './icons/theme.svg';
import smile from './icons/smile.svg';
import gallery from './icons/gallery.svg';
import tag from './icons/tag.svg';
import emoji from './icons/emoji.svg';
import mic from './icons/mic.svg';
import more from './icons/more.svg';
import { Avatar } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import CollectionsIcon from '@mui/icons-material/Collections';
import MoodIcon from '@mui/icons-material/Mood';
import './Post.css';
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import './CreatPost.css';
import DialogContent from '@mui/material/DialogContent';
import jQuery from "jquery";
import PollIcon from '@mui/icons-material/Poll';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../Store/action/User';

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

function Post({ poll, group_id }) {
    const users = useSelector((state) => state.UserReducer.direc)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(User())
    }, [])

    const [input, setInput] = useState("")
    const [openPost, setopenPost] = useState(false);
    const handleClickOpen = () => {
        setopenPost(true);
    };
    const handleClose = () => {
        setopenPost(false);
    };
    const [ShowImageInput, setShowImageInput] = useState(false);
    const handleshowinput = () => {
        if (ShowImageInput === false) {
            setShowImageInput(true)
        } else {
            setShowImageInput(false)
        }
    };
    const [image, setImage] = useState([])
    const [post, setPost] = useState(null)
    function submit(e) {
        e.preventDefault();
    }

    const sendPostData = {
        postcontent: post,
        imagecontent: image,
        user: users
    }
    const addNewPost = () => {
        axios.post("http://127.0.0.1:8000/api/addpost/",
            sendPostData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'X-CSRFToken': getCookie('csrftoken')

                }
            },
        ).then(res => {
            setopenPost(false);

        }).catch((err) => console.log(err))
    }
    const sendPostDatagroup = {
        group: parseInt(group_id),
        postcontent: post,
        images: image,
        user: parseInt(users.id),
    }
    const addNewPostforGroups = () => {
        axios.post("http://127.0.0.1:8000/api/addpostforgroups/",
            sendPostDatagroup,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'X-CSRFToken': getCookie('csrftoken')
                }
            },
        ).then(res => {
            setopenPost(false);
            console.log(res)
        }).catch((err) => console.log(err))
    }
    return (
        <>
            <div className="post ">
                <div className="post_top">
                    <Avatar src={users.pic} className="Posts_avatar" />
                    <input
                        readonly
                        variant="contained"
                        className="post_input"
                        placeholder={"what's on your mind? " + users.first_name}
                        value={input}
                        name="postcontent"
                        onChange={(e) => setInput(e.target.value)}
                        onClick={handleClickOpen}
                    />
                </div>
                <div className="post_bottom">
                    <div className="post_OPTION">
                        <VideocamIcon style={{ color: "red" }} />
                        <h3>Live Video</h3>
                    </div>
                    <div variant="contained" className="post_OPTION" onClick={handleClickOpen}>
                        <CollectionsIcon style={{ color: "green" }} />
                        <h3>Photo/Video</h3>
                    </div>

                    {
                        poll === "0" ?
                            <div className="post_OPTION">
                                <PollIcon style={{ color: "orange" }} />
                                <h3>Poll</h3>
                            </div>
                            :
                            <div className="post_OPTION">
                                <MoodIcon style={{ color: "yellow" }} />
                                <h3>Felling/Activity</h3>
                            </div>
                    }

                </div>
            </div>
            <Dialog
                open={openPost}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent dividers>
                    <div className="container">
                        <div className="wrapper">
                            <section className="post">
                                <header>Create Post</header>
                                <form onSubmit={(e) => submit(e)} enctype="multipart/form-data"   >

                                    <div className="content">
                                        <img src={users.pic} alt="logo" />
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
                                        spellcheck="false"
                                        required
                                        name="postcontent"
                                        onChange={(e) => setPost(e.target.value)}
                                    ></textarea>
                                    <div>{ShowImageInput ? <input type="file" accept="image/*" multiple
                                        className="post_input"
                                        placeholder="Enter your image here"
                                        name="imagecontent" onChange={(e) => setImage(e.target.files[0])} />
                                        : null}
                                    </div>
                                    <div className="theme-emoji">
                                        <img src={theme} alt="theme" />
                                        <img src={smile} alt="smile" />
                                    </div>
                                    <div className="options">
                                        <p>Add to Your Post</p>
                                        <ul className="list">
                                            <li><img src={gallery} alt="gallery" onClick={handleshowinput} /></li>
                                            <li><img src={tag} alt="gallery" /></li>
                                            <li><img src={emoji} alt="gallery" /></li>
                                            <li><img src={mic} alt="gallery" /></li>
                                            <li><img src={more} alt="gallery" /></li>
                                        </ul>
                                    </div>
                                    {
                                        poll === "0" ?
                                            <button type='submit' onClick={addNewPostforGroups} >Post</button>
                                            :
                                            <button type='submit' onClick={addNewPost} >Post</button>
                                    }
                                </form>
                            </section>
                            <section className="audience">
                                <header>
                                    <div className="arrow-back"><i className="fas fa-arrow-left"></i></div>
                                    <p>Select Audience</p>
                                </header>
                                <div className="content">
                                    <p>Who can see your post?</p>
                                    <span
                                    >Your post will show up in News Feed, on your profile and in
                                        search results.</span
                                    >
                                </div>
                                <ul className="list">
                                    <li>
                                        <div className="column">
                                            <div className="icon"><i className="fas fa-globe-asia"></i></div>
                                            <div className="details">
                                                <p>Public</p>
                                                <span>Anyone on or off Facebook</span>
                                            </div>
                                        </div>
                                        <div className="radio"></div>
                                    </li>
                                    <li className="active">
                                        <div className="column">
                                            <div className="icon"><i className="fas fa-user-friends"></i></div>
                                            <div className="details">
                                                <p>Friends</p>
                                                <span>Your friends on Facebook</span>
                                            </div>
                                        </div>
                                        <div className="radio"></div>
                                    </li>
                                    <li>
                                        <div className="column">
                                            <div className="icon"><i className="fas fa-user"></i></div>
                                            <div className="details">
                                                <p>Specific</p>
                                                <span>Only show to some friends</span>
                                            </div>
                                        </div>
                                        <div className="radio"></div>
                                    </li>
                                    <li>
                                        <div className="column">
                                            <div className="icon"><i className="fas fa-lock"></i></div>
                                            <div className="details">
                                                <p>Only me</p>
                                                <span>Only you can see your post</span>
                                            </div>
                                        </div>
                                        <div className="radio"></div>
                                    </li>
                                    <li>
                                        <div className="column">
                                            <div className="icon"><i className="fas fa-cog"></i></div>
                                            <div className="details">
                                                <p>Custom</p>
                                                <span>Include and exclude friends</span>
                                            </div>
                                        </div>
                                        <div className="radio"></div>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>

                </DialogContent>
            </Dialog>
        </>
    )
}

export default Post