import { useState } from "react";

import { Avatar } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import CollectionsIcon from '@mui/icons-material/Collections';
import MoodIcon from '@mui/icons-material/Mood';
import '../css/Post.css';

function Post() {
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
                <Avatar />
                <form>
                    <input className="post_input"
                        placeholder="what's on your mind?"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onClick={(e) => handlebutton(e)}
                    />
                    { showImageInput ? <input type="file" accept="image/*" multiple
                        className="post_input"
                        placeholder="Enter your image here"
                        value={imageUrl}
                        style={{}}
                        onChange={(e) => setImageUrl(e.target.value)}
                    /> : null }
                    {showbutton ? <button onClick={handelSubmit} type="submit" class="add">Post</button> : null }
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