import React from 'react'
import Story from './Story';
import '../css/StoryReel.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useEffect, useState} from "react";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import gallery from '../Post/icons/gallery.svg';
import '../Post/CreatPost.css';
import { Avatar } from '@mui/material';

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
    const [ShowImageInput, setShowImageInput] = React.useState(false);
    const handleshowinput = () => {
        if (ShowImageInput === false){
            setShowImageInput(true)
        }
        else {
            setShowImageInput(false)
        }
    };
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
    }, [])
    const [imagecontent,setimagecontent] = useState('')
    const data  =
    {
        pic: imagecontent,
        user: parseInt(user.id),
    }
    const addNewٍStory =  ()=>{axios.post("http://127.0.0.1:8000/api/addStory/",
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
    return (
        <div className="storyReel">
            <div class="story create-story">
            <img src="https://images.pexels.com/photos/12389754/pexels-photo-12389754.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200" alt="" />
            <div class="icon">
                <AddCircleOutlineIcon  onClick={handleClickOpen}/>
            </div>
            <h4>Create Story</h4>
            </div>
            {
                stories.slice(0,4).map((story) =>{
                    return <>
                        <Story image={story['story_pic']} profilSrc={story['user_pic']} title={story['user_name']}/>
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
                        <DialogContent dividers>
                            <div className="container">
                                <div className="wrapper">
                                    <section className="post">
                                    <header>Create Post</header>
                                        <div className="content">
                                        <Avatar src={user.pic}/>
                                        <div className="details">
                                            <p>{user.first_name+' '+user.last_name}</p>
                                        </div>
                                        </div>
                                        <div> 
                                            <input type="file" accept="image/*"
                                            className="post_input"
                                            onChange={(e) =>{setimagecontent(e.target.files[0])}}
                                            placeholder="Enter your image here"
                                            name ="imagecontent"/> 
                                        </div>
                                        <button onClick={addNewٍStory} style={{width:'100%'}}>Post</button>
                                    </section>
                                </div>
                            </div>
                        </DialogContent>
                    </DialogContent>
            </Dialog>
        </div>
    )
}

export default StoryReel