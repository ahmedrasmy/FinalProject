import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import CSRF from "../Auth/CSRF";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatIcon from '@mui/icons-material/Chat';
import { useLocation } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material';
import '../Post/CreatPost.css';
import Header from '../Header/Header';
import Post from '../Post/Post';
import AllPosts from '../Post/AllPosts';
import { useEffect, useState } from "react";
import axios from "axios";
import PublicIcon from '@mui/icons-material/Public';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupsIcon from '@mui/icons-material/Groups';
import Check from './Check';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function Groups() {
    let location = useLocation();
    let id = location.pathname.split('/')[3]
    const [group, setgroup] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get_group/' + id)
            .then(res => {
                setgroup(res.data[0]);
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }, [id])
    const [user, setUser] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get_user_for_group/' + id)
            .then(res => {
                setUser(res.data[0]);
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }, [])
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getpostforgroup/' + id)
            .then(res => {
                setPosts(res.data);
            })
            .catch((err) => console.log(err))
    }, [])
    const [requests, setrequests] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/joinrequests/' + id)
            .then(res => {
                setrequests(res.data);
            })
            .catch((err) => console.log(err))
    }, [])
    const datarequest =
    {
        sender: parseInt(user['user_id']),
        reciver: parseInt(id),
    }
    const joinThegroup = () => {
        axios.post("http://127.0.0.1:8000/api/joinGroup/",
            datarequest, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        },
        ).then(res => { }).catch((err) => console.log(err))
    }
    const dataremove = {
        id: parseInt(id),
    }
    const removeGroup = () => {
        axios.post("http://127.0.0.1:8000/api/removeGroup/",
            dataremove, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        },
        ).then(res => { }).catch((err) => console.log(err))
    }
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [friends, setfriends] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/friends_list_group/' + id)
            .then(res => {
                setfriends(res.data);
            })
            .catch((err) => console.log(err))
    }, [])
    const [OpenPhotos, setOpenPhotos] = useState(false)
    return (
        <>
            <Header />
            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog modal-lg">
                </div>
            </div>
            <div>
                <div className=" w-full flex justify-center w-80" style={{ height: '348px' }}>
                    <div className="flex flex-col">
                        <div className="md:relative bg-gray-100 md:rounded-bl-lg md:rounded-br-lg
                        bg-gradient-to-b from-gray-100 via-gray-100 to-gray-400"
                            style={{ width: '940px', height: '348px' }}>
                            <img src={group['group_pic']} style={{ width: "940px", height: "348px" }} />
                        </div>
                    </div>
                </div>
                {/* // INFOS */}
                <div className="flex  flex-col mt-5 mb-3.5">
                    <h1 className="flex self-center w-2/3 mt-2 font-bold text-3xl">{group['group_name']} </h1>
                    <hr className="full flex self-center w-2/3 mt-2" />
                </div>
                {/* // END INFOS */}
                {/* // TABS */}
                <div className="w-full flex justify-center">
                    <div className="flex justify-between mb-2.5">
                        <ul className="flex px-5 py-1.5">
                            <li className="px-3 font-semibold text-gray-600" onClick={() => setOpenPhotos(false)} style={{ cursor: 'pointer' }}>About</li>
                            <li className="px-3 font-semibold text-gray-600" onClick={() => setOpenPhotos(false)} style={{ cursor: 'pointer' }}>Discussion</li>
                            <li className="px-3 font-semibold text-gray-600"><a href={"/home/group/people/" + id}>People</a></li>
                            <li className="px-3 font-semibold text-gray-600" onClick={() => setOpenPhotos(true)} style={{ cursor: 'pointer' }}>Photos</li>
                        </ul>
                        <ul className="flex mb:pl-14">
                            {
                                user['is_member'] === false && user['is_owner'] === false ?
                                    <>
                                        <li className="px-2 font-semibold">
                                            <IconButton onClick={joinThegroup} className="bg-blue-600  py-1 rounded-lg text-white font-semibold" >
                                                join
                                            </IconButton>
                                        </li>
                                    </>
                                    :
                                    null
                            }
                            {
                                user['is_member'] === true ?
                                    <>
                                        <li className="px-2 font-semibold">
                                            <div class="dropdown">
                                                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    join
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">
                                                        <form action={'/home/leave_group/'} method="post">
                                                            <CSRF />
                                                            <input type="hidden" name="sender_id" value={user['user_id']} />
                                                            <input type="hidden" name="group_id" value={id} />
                                                            <IconButton type="submit"><span style={{ fontSize: "15px" }}>leave group</span></IconButton>
                                                        </form>
                                                    </a></li>
                                                    {/* <li><a class="dropdown-item" href="#">Something else here</a></li> */}
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="px-2 font-semibold">
                                            <Button onClick={handleClickOpen} className="bg-blue  py-1 rounded-lg text-white font-semibold" >
                                                <span style={{ color: "blue" }}>invite</span>
                                            </Button>
                                        </li>
                                    </>
                                    : null
                            }
                            {
                                user['is_owner'] === true ?
                                    <>
                                        <li className="px-2 font-semibold">
                                            <Button onClick={handleClickOpen} className="bg-blue  py-1 rounded-lg text-white font-semibold" >
                                                <span style={{ color: "blue" }}>invite</span>
                                            </Button>
                                        </li>
                                        <li className="px-2 font-semibold">
                                            <Button onClick={removeGroup} className="bg-blue  py-1 rounded-lg text-white font-semibold" >
                                                <span style={{ color: "blue", width: "50px" }}>remove group</span>
                                            </Button>
                                        </li>
                                    </>
                                    : null
                            }
                        </ul>
                    </div>
                </div>
            </div>
            {
                OpenPhotos === false ?
                    <div className=" w-full flex justify-center w-80">
                        <div className="flex flex-col">
                            <div className="md:relative bg-gray-100 md:rounded-bl-lg md:rounded-br-lg
                    bg-gradient-to-b from-gray-100 via-gray-100 to-gray-400"
                                style={{ width: '940px' }}>
                                <div className="row " style={{ width: '940px' }}>
                                    <div className="col" style={{ margin: "5px", paddingTop: "10px" }}>
                                        <div className="row">
                                            {
                                                user['is_member'] === true || user['is_owner'] === true ?
                                                    <div style={{ marginBottom: "10px", width: "100%" }}>
                                                        <Post poll="0" group_id={id} />
                                                    </div>
                                                    : null
                                            }
                                            <div style={{ marginBottom: "10px", width: "100%" }}>
                                                {
                                                    posts.map((post) => {
                                                        return <>
                                                            <AllPosts profilePic={post.user.pic}
                                                                post_id={post.id}
                                                                message={post.postcontent}
                                                                timestamp={post.postdate}
                                                                username={post.user.first_name + ' ' + post.user.last_name}
                                                                image={post.images}
                                                                comments={post.post_comments_group}
                                                                user_id={post.user.id}
                                                                group_id={id}
                                                            />
                                                        </>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col " style={{ margin: "5px", paddingTop: "10px" }}>
                                        <div className="row " >
                                            <div style={{ marginBottom: "10px", backgroundColor: "white", height: '300px', width: "100%" }}>
                                                <h4>About</h4>
                                                <p>{group.About_group}</p>
                                                <h5><PublicIcon style={{ marginRight: "10px", marginTop: "20px" }} />Public</h5>
                                                <p style={{ marginLeft: "15px" }}>Anyone can see who's in the group and what they post.</p>
                                                <h5><VisibilityIcon style={{ marginRight: "10px" }} /> Visible</h5>
                                                <p style={{ marginLeft: "15px" }}>Anyone can find this group.</p>
                                                <h5><GroupsIcon style={{ marginRight: "10px" }} /> General</h5>
                                            </div>
                                            <div style={{ marginBottom: "10px", backgroundColor: "white", height: '348px', width: "100%" }}>
                                                <div className="row ">
                                                    <h5>Recent media : </h5>
                                                    {
                                                        posts.slice(0, 10).map((post) => {
                                                            return <>
                                                                <div className="col-4" style={{ marginBottom: "15px", }}>
                                                                    <img src={post.images} />
                                                                </div>
                                                            </>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            {
                                                user['is_owner'] === true ?
                                                    <div style={{ marginBottom: "10px", paddingTop: "10px", backgroundColor: "white", height: '348px', width: "100%" }}>
                                                        <h4 >Join Requests : </h4>
                                                        <div style={{ paddingLeft: "10px" }}>
                                                            {
                                                                requests.slice(0, 3).map((request) => {
                                                                    return <>
                                                                        <div className="row">
                                                                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                                                                <Avatar src={request.sender.pic} /><div>{request.sender.first_name + ' ' + request.sender.last_name}</div>
                                                                            </div>
                                                                            <div className="row" >
                                                                                <div className="col">
                                                                                    <form action={'/home/member_request_delete/'} method="post">
                                                                                        <CSRF />
                                                                                        <input type="hidden" name="request_id" value={request.id} />
                                                                                        <input type="hidden" name="sender_id" value={request.sender.id} />
                                                                                        <input type="hidden" name="group_id" value={id} />
                                                                                        <IconButton type="submit" style={{ color: "blue" }}> <CancelIcon /></IconButton>
                                                                                    </form>
                                                                                </div>
                                                                                <div className="col">
                                                                                    <form action={'/home/member_request_accept/'} method="post">
                                                                                        <CSRF />
                                                                                        <input type="hidden" name="request_id" value={request.id} />
                                                                                        <input type="hidden" name="sender_id" value={request.sender.id} />
                                                                                        <input type="hidden" name="group_id" value={id} />
                                                                                        <IconButton type="submit" style={{ color: "blue" }}> <CheckCircleIcon /></IconButton>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                })
                                                            }
                                                        </div>
                                                        {
                                                            requests.length > 3 ?
                                                                <a href={"/home/group/requests/" + id} className="btn btn-secondary" style={{ width: "100%" }}>see all</a>
                                                                : null
                                                        }
                                                    </div>
                                                    : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div className=" w-full flex justify-center w-80">
                        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                            {posts.map((post) => (
                                <ImageListItem key={post.images} style={{ margin: "15px" }}>
                                    <img
                                        src={post.images}
                                        srcSet={post.images}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Invite from friends"}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <div style={{ width: "1900px" }}>
                        </div>
                    </Typography>
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                {
                                    friends.map((friend) => {
                                        return <>
                                            <Check
                                                user_id={user['user_id']}
                                                group_id={id}
                                                reciver_id={friend['friend_id']}
                                                name={friend['friend_name']}
                                                pic={friend['friend_pic']}
                                            />
                                        </>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Groups