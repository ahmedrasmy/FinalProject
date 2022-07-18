import React, { useState } from 'react'
import { Avatar } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import CollectionsIcon from '@mui/icons-material/Collections';
import MoodIcon from '@mui/icons-material/Mood';
import '../css/Post.css';

function Post() {
    const {input , setInput}=useState("");
    const handelSubmit = (e) => {
        e.preventDefault();
        /// do some data base here

        setInput("");
    }
    return (
        <div className="post ">
            <div className="post_top">
                <Avatar />
                <form>
                    <input className="post_input" 
                        placeholder="what's on your mind?"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={handelSubmit} type="submit">Hidden button</button>
                </form>
            </div>
            <div className="post_bottom">
                <div className="post_OPTION">
                    <VideocamIcon style={{color : "red"}}/>
                    <h3>Live Video</h3>
                </div>
                <div className="post_OPTION">
                    <CollectionsIcon style={{color : "green"}}/>
                    <h3>Photo/Video</h3>
                </div>
                <div className="post_OPTION">
                    <MoodIcon style={{color : "yellow"}}/>
                    <h3>Felling/Activity</h3>
                </div>
            </div>
        </div>
    )
}

export default Post