import { useEffect, useState, React } from "react";
import { Avatar, IconButton, stepIconClasses } from '@mui/material';
import './AllPosts.css';
import love3 from '../images/love3.svg';
import care from '../images/care.png';
import emotion4 from '../images/emotion4.webp';
import emotion5 from '../images/emotion5.webp';
import emotion6 from '../images/emotion6.webp';
import emotion7 from '../images/emotion7.webp';
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

function AllPosts({ post_id, profilePic, image, username, timestamp, message, comments ,group_id=0}) {
    var likeid;
    const [users, setUsers] = useState({})
    const [posts, setPosts] = useState({})
    const [userLike, setUserLike] = useState(0)
    const [Icon,setIcon]= useState(0)
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get/')
            .then(res => {
                setUsers(res.data[0]);
            })
            .catch((err) => console.log(err))
    }, [])
    const addlike = (e) => {
        const sentmessage = {
            post: post_id,
            user: users.id,
            iconId:parseInt(e),
        }
        if ( group_id != 0){
            axios.post("http://127.0.0.1:8000/api/get_like_group/",
            sentmessage, 
            {
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
                    }
                }
            }).catch((err) => console.log(err))
        }
        else {
            axios.post("http://127.0.0.1:8000/api/get_like/",
            sentmessage, 
            {
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
                    }
                }
            }).catch((err) => console.log(err))
        }
    }
    if ( group_id  != 0 ){
            useEffect(() => {
                        axios.get('http://127.0.0.1:8000/api/get_likee_group/')
                            .then(res => {
                                setPosts(res.data);
                            })
                            .catch((err) => console.log(err))
                    }, [])
        }
    else {
        useEffect(() => {
            axios.get('http://127.0.0.1:8000/api/get_likee/')
                .then(res => {
                    setPosts(res.data);
                })
                .catch((err) => console.log(err))
        }, [])
    }

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
        axios.delete("http://127.0.0.1:8000/api/delete_like/" +
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
            }).catch((err) => console.log(err))
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
            <div className = "all_posts" >
                <div className = "Top_section" >
                    <Avatar src = { profilePic } className = "Posts_avatar" / >
                    <div className = "Top_section_info" >
                    <h3 > { username } </h3>
                    <p> { timestamp }</p> 
                    </div>
                </div> 
                <div className = "bottom_section" >
                    <p> { message } </p> 
                </div> 
                <div className = "bottom_section_image row" >
                {
                    image.map((img) => {
                        return <>
                            <img src = { img } className = "col" alt = ""/>
                        </>
                    })
                } 
                </div>
                <div className = "nums-comments-iteractions">
                    <div className = "interaction">
                        <i className = "fa-solid fa-thumbs-up icon1" ></i> 
                        <i className = "fa-solid fa-heart icon2" ></i> 
                        <i className = "fa-regular fa-face-grin-beam icon3" > </i> 
                        <a href = "#" > </a> 
                    </div> 
                    <a href = "#" class = "nums-comments" > {comments.length} Coments 20 Shares </a>
                </div>
                <div className = "like-comment-share" >
                    <div className = "icon like" >
                        {
                            userLike === 1 ? <>
                                {
                                    Icon === 0 ?
                                        <IconButton onClick = { handleClose } > 
                                            <i 
                                                className = "fa-regular fa-thumbs-up"
                                                style = {
                                                { color: colors } } > 
                                            </i>
                                            Like
                                        </IconButton>
                                    : null 
                                }
                                {
                                    Icon === 1 ?
                                        <IconButton onClick = { handleClose } >
                                            <img src={love3} class="love icon2" alt="" />
                                        </IconButton>
                                    : null 
                                }
                                {
                                    Icon === 2 ?
                                        <IconButton onClick = { handleClose } >
                                            <img src={care} class="icon3" alt="" />
                                        </IconButton>
                                    : null 
                                }
                                {
                                    Icon === 3 ?
                                        <IconButton onClick = { handleClose } >
                                            <img src={emotion4} class="icon4" alt="" />
                                        </IconButton>
                                    : null 
                                }
                                {
                                    Icon === 4 ?
                                        <IconButton onClick = { handleClose } >
                                            <img src={emotion5} class="icon5" alt="" />
                                        </IconButton>
                                    : null 
                                }
                                {
                                    Icon === 5 ?
                                        <IconButton onClick = { handleClose } >
                                            <img src={emotion6} class="icon6" alt="" />
                                        </IconButton>
                                    : null 
                                }
                                {
                                    Icon === 6 ?
                                        <IconButton onClick = { handleClose } >
                                            <img src={emotion7} class="icon7" alt="" />
                                        </IconButton>
                                    : null 
                                }
                            </>
                            : <>
                                <IconButton id="0" > 
                                    <i className = "fa-regular fa-thumbs-up"> 
                                    </i>
                                    Like
                                </IconButton>
                                <div class="emoji">
                                    <IconButton id="0" onClick = {(e)=> addlike(0)}><i class="fa-solid fa-thumbs-up icon1"></i></IconButton>
                                    <IconButton id="1" onClick = {(e)=> addlike(1)} ><img src={love3} class="love icon2" alt="" /></IconButton>
                                    <IconButton id="2" onClick = {(e)=> addlike(2)} ><img src={care} class="icon3" alt="" /></IconButton>
                                    <IconButton id="3" onClick = {(e)=> addlike(3)}><img src={emotion4} class="icon4" alt="" /></IconButton>
                                    <IconButton id="4" onClick = {(e)=> addlike(4)}><img src={emotion5} class="icon5" alt="" /></IconButton>
                                    <IconButton id="5" onClick = {(e)=> addlike(5)}><img src={emotion6} class="icon6" alt="" /></IconButton>
                                    <IconButton id="6" onClick = {(e)=> addlike(6)}><img src={emotion7} class="icon7" alt="" /></IconButton>
                                </div>
                            </>
                        }
                    </div> 
                    <div className = "icon icon-comment" >
                        <i className = "fa-regular fa-comment" ></i> 
                        Comment 
                    </div> 
                    <div className = "icon"><i className="fa-solid fa-share" ></i> Share</div >
                </div> 
                    <div className = "create-comment" >
                        <Avatar src = { users.pic } className = "Posts_avatar" / >
                        <input type = "text"
                            placeholder = "Write A comment"
                            className = "commentInput"
                            name = "commentcontent"
                            onChange = {
                            (e) => setComment(e.target.value) }
                            onKeyDown = {
                            (e) => handleKeyDown(e) }
                        />
                    </div>
            </div> 
        </>
    )
}

export default AllPosts