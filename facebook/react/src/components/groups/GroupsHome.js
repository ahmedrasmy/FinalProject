import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, IconButton } from '@mui/material';
import '../Post/CreatPost.css';
import Header from '../Header/Header';
import AllPosts from '../Post/AllPosts';
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../Store/action/User';


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



function GroupsHome() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [groups, setgroups] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getGroups/')
            .then(res => {
                setgroups(res.data);
            })
            .catch((err) => console.log(err))
    }, [])
    const [ownGroups, setownGroups] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/ownGroups/')
            .then(res => {
                setownGroups(res.data);
            })
            .catch((err) => console.log(err))
    }, [])

    const users = useSelector((state) => state.UserReducer.direc)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(User())
    }, [])

    const [imagecontent, setimagecontent] = useState('')
    const [About, setAbout] = useState(null)
    const [group_name, setgroup_name] = useState(null)
    const groupdata = {
        owner: parseInt(user.id),
        group_name: group_name,
        group_pic: imagecontent,
        About_group: About,
    }
    const createGroup = () => {
        axios.post("http://127.0.0.1:8000/api/createGroup/",
            groupdata,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'X-CSRFToken': getCookie('csrftoken')
                }
            },
        ).then(res => {
            setOpen(false);
        }).catch((err) => console.log(err))
    }
    const [sugustionsGroups, setsugustionsGroups] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/sugustionsGroups/')
            .then(res => {
                setsugustionsGroups(res.data);
            })
            .catch((err) => console.log(err))
    }, [])
    const [GroupPost, setGroupPost] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getGroupPost/')
            .then(res => {
                setGroupPost(res.data);
            })
            .catch((err) => console.log(err))
    }, [])
    return (
        <>
            <Header />
            <div className='row ' style={{ marginTop: "10px" }}>
                <div className='col-3 ' style={{ backgroundColor: "white", minHeight: "600px", paddingTop: "5px", paddingLeft: "25px", position: "-webkit-sticky" }}>
                    <h4 style={{ marginBottom: "20px" }}>Groups : </h4>
                    <hr style={{ marginBottom: "20px" }}></hr>
                    <Button style={{ width: "100%", backgroundColor: "#c8dbf2", marginBottom: "20px" }} onClick={handleClickOpen}>Create new From here</Button>
                    <hr style={{ marginBottom: "20px" }}></hr>
                    <div className='row'>
                        <h6 style={{ textDecoration: "underline", color: "blue", marginBottom: "20px" }}>your groups : </h6>
                        {
                            ownGroups.map((group) => {
                                return <>
                                    <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
                                        <Avatar src={group['group_pic']} />
                                        <a href={"/home/group/" + group['group_id']} style={{ textDecoration: "none" }}>
                                            <div style={{ marginTop: "8px", marginLeft: "20px", marginRight: "40px" }}>{group['group_name']}</div>
                                        </a>
                                    </div>
                                    <hr style={{ marginTop: "20px" }}></hr>
                                </>
                            })
                        }
                        <hr></hr>
                        <h6 style={{ textDecoration: "underline", color: "blue" }}> Groups u join  : </h6>
                        {
                            groups.map((group) => {
                                return <>
                                    <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
                                        <Avatar src={group['group_pic']} />
                                        <a href={"/home/group/" + group['group_id']} style={{ textDecoration: "none" }}>
                                            <div style={{ marginTop: "8px", marginLeft: "20px", marginRight: "40px" }}>{group['group_name']}</div>
                                        </a>
                                    </div>
                                    <hr style={{ marginTop: "20px" }}></hr>
                                </>
                            })
                        }
                    </div>
                </div>

                <div className='col-6 ' style={{ height: "100%", paddingTop: "30px", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ marginBottom: "10px", width: "90%" }}>
                        {
                            GroupPost.map((post) => {
                                return <>
                                    <div style={{ marginLeft: "100px", marginBottom: "30px" }}>
                                        <div className='row'>
                                            <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
                                                <Avatar src={post['group_pic']} />
                                                <a href={"/home/group/" + post['group_id']} style={{ textDecoration: "none" }}>
                                                    <div style={{ marginTop: "8px", marginLeft: "20px", marginRight: "40px" }}>{post['group_name']}</div>
                                                </a>
                                            </div>
                                        </div>
                                        <AllPosts
                                            profilePic={post['user_pic']}
                                            post_id={post['post_id']}
                                            message={post['postcontent']}
                                            timestamp={post['post_timestamp']}
                                            username={post['username']}
                                            image={post['post_pic']}
                                            group_id={post['group_id']}
                                            comments={post['comments']}
                                        />
                                    </div>
                                </>
                            })
                        }
                    </div>
                </div>
                <div className='col-3' style={{ backgroundColor: "white", paddingTop: "20px", minHeight: "600px", position: "-webkit-sticky" }}>
                    <h6 style={{ textDecoration: "underline", marginBottom: "20px" }}>Group sugustions :</h6>
                    <hr style={{ marginBottom: "20px" }}></hr>
                    <div className='row'>
                        {
                            sugustionsGroups.map((group) => {
                                return <>
                                    <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
                                        <Avatar src={group['group_pic']} />
                                        <a href={"/home/group/" + group['group_id']} style={{ textDecoration: "none" }}>
                                            <div style={{ marginTop: "8px", marginLeft: "20px", marginRight: "40px" }}>{group['group_name']}</div>
                                        </a>
                                    </div>
                                    <hr style={{ marginTop: "20px" }}></hr>
                                </>
                            })
                        }
                    </div>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"create new group"}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <div style={{ width: "1900px" }}>
                        </div>
                    </Typography>
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                <span style={{ marginBottom: "20px" }} >Group Name:&nbsp;&nbsp;&nbsp;
                                    <input
                                        style={{ color: "black" }}
                                        type="text"
                                        id="group_name"
                                        placeholder="Group Name"
                                        onChange={(e) => setgroup_name(e.target.value)}
                                    />
                                </span>
                                <span style={{ marginBottom: "30px", display: "flex" }}>
                                    <div>About Group :&nbsp;</div>
                                    <textarea
                                        placeholder={"About the Group"}
                                        spellcheck="false"
                                        required
                                        name="About"
                                        onChange={(e) => setAbout(e.target.value)}
                                        style={{ width: "75%", height: "150px" }}
                                    ></textarea>
                                </span>
                                <span style={{ marginBottom: "20px" }} >group cover :&nbsp;&nbsp;&nbsp;
                                    <input type="file" accept="image/*"
                                        className="post_input"
                                        onChange={(e) => {
                                            setimagecontent(e.target.files[0])
                                        }}
                                        placeholder="Enter your image here"
                                        name="imagecontent" />
                                </span>
                                <button onClick={createGroup} style={{ width: '100%' }}>Create </button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default GroupsHome