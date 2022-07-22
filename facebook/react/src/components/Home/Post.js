import { useState } from "react";

import { Avatar } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import CollectionsIcon from '@mui/icons-material/Collections';
import MoodIcon from '@mui/icons-material/Mood';
import '../css/Post.css';
import CSRF from '../Auth/CSRF';
import React, {useEffect} from "react";
import axios from "axios";
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
    const [showImageInput,setshowImageInput] =useState(false)
    const [showbutton,setshowbutton] =useState(false)
    const [imageUrl, setImageUrl] = useState("");
    const handelSubmit = (e) => {
        e.preventDefault();
        /// do some data base here

        setInput("");
        setImageUrl("");
        setshowbutton(false);
        setshowImageInput(false);
    }
    const handlebutton=(e)=>{
        setshowbutton(true)
    }
    const handleImageInput=(e)=>{
        if (showImageInput === false ){
            setshowImageInput(true)
            setshowbutton(true)
        }
        else{
            setshowImageInput(false)
            setshowbutton(false)
        }

    }
    return (
        <div className="post ">
            <div className="post_top">
                  <Avatar src={users.pic} className="Posts_avatar" />
                <form action="/home/addpost/"  enctype="multipart/form-data"  method= "post" >
               < CSRF />
                    <input className="post_input"
                        placeholder="what's on your mind?"
                        value={input}
                        name="postcontent"
                        onChange={(e) => setInput(e.target.value)}
                        onClick={(e) => handlebutton(e)}
                    />
                    { showImageInput ? <input type="file" accept="image/*" multiple
                        className="post_input"
                        placeholder="Enter your image here"
                        name ="imagecontent"
                        onChange={(e) => setImageUrl(e.target.value)}
                    /> : null }
                    {showbutton ? <button  type="submit" class="add">Post</button> : null }
                </form>
            </div>
            <div className="post_bottom">
                <div className="post_OPTION">
                    <VideocamIcon style={{color : "red"}}/>
                    <h3>Live Video</h3>
                </div>
                <div className="post_OPTION" onClick={(e) => handleImageInput(e)}>
                    <CollectionsIcon style={{color : "green"}} />
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