import { useState,useEffect } from "react";
import React from 'react';
import { Avatar } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import CollectionsIcon from '@mui/icons-material/Collections';
import MoodIcon from '@mui/icons-material/Mood';
import './Post.css';
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CreatePost from './CreatePost';

function Post() {
    const [users, setUsers] = useState({})
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get/')
            .then(res => {
                setUsers(res.data[0]);
            })
            .catch((err) => console.log(err))
    }, [])
    const [input , setInput] =useState("")
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <div className="post ">
                <div className="post_top">
                    <Avatar src={users.pic} className="Posts_avatar" />
                        <input 
                            readonly 
                            variant="contained"
                            className="post_input"
                            placeholder={"what's on your mind?"+users.first_name}
                            value={input}
                            name="postcontent"
                            onChange={(e) => setInput(e.target.value)}
                            onClick={handleClickOpen}
                        />
                </div>
                <div className="post_bottom">
                    <div className="post_OPTION">
                        <VideocamIcon style={{color : "red"}}/>
                        <h3>Live Video</h3>
                    </div>
                    <div variant="contained" className="post_OPTION" onClick={handleClickOpen}>
                        <CollectionsIcon style={{color : "green"}} />
                        <h3>Photo/Video</h3>
                    </div>
                    <div className="post_OPTION">
                        <MoodIcon style={{color : "yellow"}}/>
                        <h3>Felling/Activity</h3>
                    </div>
                </div>
            </div>
            <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent dividers>

                        <CreatePost/>
                    </DialogContent>
            </Dialog>
        </>
    )
}

export default Post