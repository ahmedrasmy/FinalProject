import React, { Component } from 'react'
import '../css/StoryReel.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from "react";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import '../Post/CreatPost.css';
import { Avatar } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import Fab from '@mui/material/Fab';
import FacebookIcon from '@mui/icons-material/Facebook';
import '../css/Contacts.css';
import Carousel from 'react-bootstrap/Carousel';
import '../css/Story.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

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

function StoryReel() {
    const [user, setUser] = useState({})
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get/')
            .then(res => {
                setUser(res.data[0]);
            })
            .catch((err) => console.log(err))
    }, [])
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [stories, setstories] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/story/')
            .then(res => {
                setstories(res.data);
            })
            .catch((err) => console.log(err))
    }, [stories])
    const [imagecontent, setimagecontent] = useState('')
    const data =
    {
        pic: imagecontent,
        user: parseInt(user.id),
    }
    const addNewٍStory = () => {
        setOpen(false)
        axios.post("http://127.0.0.1:8000/api/addStory/",
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'X-CSRFToken': getCookie('csrftoken')
                }
            },
        ).then(res => {
            console.log(res)
            setOpen(false);
        }).catch((err) => console.log(err))
    }
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }
    function handelclosestories() {
        setShow(false);
    }
    const deleteStory = (DeletedLikeId) => {
        axios.delete("http://127.0.0.1:8000/api/deleteStory/" +
            DeletedLikeId, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        },
        ).then(res => { }).catch((err) => console.log(err))
    }
    return (
        <div className="storyReel">
            <div class="story create-story">
                <img src={user.pic} alt="" onClick={handleClickOpen} />
                <div class="icon">
                    <AddCircleOutlineIcon onClick={handleClickOpen} color="white" />
                </div>
                <h4 style={{ color: 'black' }}>Create Story</h4>
            </div>
            {
                stories.slice(0, 4).map((story) => {
                    return <>
                        <div style={{ backgroundImage: 'url(' + story['story_pic'] + ')' }} className="story" onClick={() => handleShow(true)}>
                            <Avatar className="story_avatar" src={story['user_pic']} />
                            <h4>{story['user_name']}</h4>
                        </div>
                        {/* <Story image={} profilSrc={} title={} /> */}
                    </>
                })
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent dividers>
                    <DialogContent dividers style={{ height: '300px' ,overflow:"hidden"}}>
                        <div className="container">
                            <div className="wrapper">
                                <section className="post">
                                    <header>Create story</header>
                                    <div className="content">
                                        <Avatar src={user.pic} />
                                        <div className="details">
                                            <p>{user.first_name + ' ' + user.last_name}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <input type="file" accept="image/*"
                                            className="post_input"
                                            onChange={(e) => { setimagecontent(e.target.files[0]) }}
                                            placeholder="Enter your image here"
                                            name="imagecontent" />
                                    </div>
                                    <button onClick={addNewٍStory} style={{ width: '100%' }}>Post</button>
                                </section>
                            </div>
                        </div>
                    </DialogContent>
                </DialogContent>
            </Dialog>
            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)} >
                <Modal.Body style={{ backgroundColor: 'black', color: 'white', margin: '0', padding: '0' }}>
                    <div className="container-fluid row ">
                        <div className="col-4 p-3 bg-white position-fixed " style={{ backgroundColor: 'white', color: 'black', height: '100%', width: '500px', marginBottom: '5px' }}>
                            <div >
                                <Fab aria-label="like">
                                    <ClearIcon onClick={handelclosestories} />
                                </Fab>
                                <FacebookIcon style={{ color: 'blue', marginLeft: '20px', fontSize: "60px", borderRadius: '5px' }} />
                            </div>
                            <br></br>
                            <div style={{ borderTop: '1px solid black', paddingTop: '30px' }} className="contacts">
                                {
                                    stories.map((story) => {
                                        return <>
                                            <a href={'/home/pro/' + story['user_id']} style={{ marginBottom: '20px', marginLeft: '20px' }}>
                                                <span className="more-hover image">
                                                    <img src={story['user_pic']} />
                                                    <span >{story['user_name']} </span>
                                                </span>
                                            </a>
                                        </>
                                    }
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-4 position-absolute right-12 top-20 mr-20 " style={{ width: '800px', height: '500px' }}>
                            <Carousel>
                                {
                                    stories.map((story) => {
                                        return <Carousel.Item interval={1000}>
                                            <img style={{ height: '500px' }}
                                                className="d-block w-100"
                                                src={story['story_pic']}
                                                alt="First slide"
                                            />
                                            <Carousel.Caption>
                                                <div className="d-flex justify-center align-content-center">
                                                    <Avatar src={story['user_pic']} />{story['user_name']}
                                                    {
                                                        story['is_mine'] === true ?
                                                            <Tooltip title="Delete" style={{ color: 'blue' }}>
                                                                <IconButton>
                                                                    <DeleteIcon onClick={() => deleteStory(story['story_id'])} color="blue" />
                                                                </IconButton>
                                                            </Tooltip>
                                                            : null
                                                    }
                                                </div>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    })
                                }
                            </Carousel>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default StoryReel