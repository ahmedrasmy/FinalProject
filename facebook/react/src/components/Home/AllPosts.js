import React from 'react'
import { Avatar } from '@mui/material';
import '../css/AllPosts.css';
import love3 from '../images/love3.svg';
import care from '../images/care.png';
import emotion4 from '../images/emotion4.webp';
import emotion5 from '../images/emotion5.webp';
import emotion6 from '../images/emotion6.webp';
import emotion7 from '../images/emotion7.webp';
import CSRF from '../Auth/CSRF';

function AllPosts({post_id,profilePic , image , username,timestamp,message ,comments}) {
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

              <div className="nums-comments-iteractions">
                <div className="interaction">
                  <i className="fa-solid fa-thumbs-up icon1"></i>
                  <i className="fa-solid fa-heart icon2"></i>
                  <i className="fa-regular fa-face-grin-beam icon3"></i>
                  <a href="#">Ahmed Rasmy,Ali and 50 others</a>
                </div>
                <a href="#" class="nums-comments">100 Coments 20 Shares</a>
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
                <div class="comments">
                {
                    comments.map((comment) => {
                        return <>
                                <div className="comment">
                                <img src={comment.split(',')[1]}  alt="" />
                                <div className="comment-body">
                                <p className="name">{comment.split(',')[0]}</p>
                                <p > {comment.split(',')[2]} </p>
                                </div>
                                </div>

                        </>
                    })
                }


                </div>
                {/*
             Start Create Comment  */}
                <div className="create-comment">
                <Avatar src={profilePic} className="Posts_avatar" />
            <form action="/home/addcomment/"   method= "post" >
                    < CSRF />
                 <input type="hidden" name="post_id" value={post_id} /> <br/>
                <input
                    type="text"
                    placeholder="Write A comment"
                    className="commentInput"
                    name="commentcontent"
                />
                <input type="submit"  value="Add Comment" class="add" />
                </form>
                </div>
              {/* End Create Comment  */}
        </div>
    )
}

export default AllPosts