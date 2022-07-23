import React from 'react'
import { Avatar } from '@mui/material';
import '../css/AllPosts.css';
import love3 from '../images/love3.svg';
import care from '../images/care.png';
import emotion4 from '../images/emotion4.webp';
import emotion5 from '../images/emotion5.webp';
import emotion6 from '../images/emotion6.webp';
import emotion7 from '../images/emotion7.webp';

function AllPosts({profilePic , image , username,timestamp,message}) {
    return (
        <div className="all_posts">
            <div className="Top_section">
                <Avatar src={profilePic} className="Posts_avatar" />
                <div className="Top_section_info">
                    <h3>{username}</h3>
                    <p>{timestamp}
                        {/*new Date(timestamp?.toDate()).toUTCString()*/}
                        </p>
                </div>
            </div>
            <div className="bottom_section">
                <p>{message}</p>
            </div>
            <div className="bottom_section_image row">

                {
                    image.map((img) => {
                        return <>
                                <img src={img} className="col" alt="" />
                        </>
                    })
                }
            </div>
                <div class="like-comment-share">
                    <div class="icon like">
                    <i class="fa-regular fa-thumbs-up"></i> Like
                    <div class="emoji">
                        <i class="fa-solid fa-thumbs-up icon1"></i>
                        <img src={love3} class="love icon2" alt="" />
                        <img src={care} class="icon3" alt="" />
                        <img src={emotion4} class="icon4" alt="" />
                        <img src={emotion5} class="icon5" alt="" />
                        <img src={emotion6} class="icon6" alt="" />
                        <img src={emotion7} class="icon7" alt="" />
                    </div>
                    </div>
                    <div class="icon icon-comment">
                    <i class="fa-regular fa-comment"></i> Comment
                    </div>
                    <div class="icon"><i class="fa-solid fa-share"></i> Share</div>
                </div>
                {/*
             Start Create Comment  */}
                <div className="create-comment">
                <Avatar src={profilePic} className="Posts_avatar" />
                <input
                    type="text"
                    placeholder="Write A comment"
                    className="commentInput"
                />
                <input type="submit" value="Add Comment" class="add" />
                </div>
              {/* End Create Comment  */}
        </div>
    )
}

export default AllPosts