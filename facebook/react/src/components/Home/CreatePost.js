import React from 'react';
import '../css/CreatPost.css';
import theme from './icons/theme.svg';
import smile from './icons/smile.svg';
import gallery from './icons/gallery.svg';
import tag from './icons/tag.svg';
import emoji from './icons/emoji.svg';
import mic from './icons/mic.svg';
import more from './icons/more.svg';
import axios from "axios";
import CSRF from '../Auth/CSRF';
import { useState,useEffect } from "react";

function CreatePost() {
    const [user, setUser] = useState({})
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get/')
            .then(res => {
                setUser(res.data[0]);
            })
            .catch((err) => console.log(err))
    }, [])
    return (
        <>
            <div className="container">
                <div className="wrapper">
                    <section className="post">
                    <header>Create Post</header>
                    <form action="/home/addpost/"  enctype="multipart/form-data"  method= "post" >
                        < CSRF />
                        <div className="content">
                        <img src={user.pic} alt="logo" />
                        <div className="details">
                            <p>{user.first_name+' '+user.last_name}</p>
                            <div className="privacy">
                            <i className="fas fa-user-friends"></i>
                            <span>Friends</span>
                            <i className="fas fa-caret-down"></i>
                            </div>
                        </div>
                        </div>
                        <textarea
                        placeholder={"What's on your mind, ?"}
                        spellcheck="false"
                        required
                        name="postcontent"
                        ></textarea> 
                        <div className="theme-emoji">
                        <img src={theme} alt="theme" />
                        <img src={smile} alt="smile" />
                        </div>
                        <div className="options">
                        <p>Add to Your Post</p>
                        <ul className="list">
                            <li><img src={gallery} alt="gallery" /></li>
                            <li><img src={tag} alt="gallery" /></li>
                            <li><img src={emoji} alt="gallery" /></li>
                            <li><img src={mic} alt="gallery" /></li>
                            <li><img src={more} alt="gallery" /></li>
                        </ul>
                        </div>
                        <button type='submit' >Post</button>
                    </form>
                    </section>
                    <section className="audience">
                    <header>
                        <div className="arrow-back"><i className="fas fa-arrow-left"></i></div>
                        <p>Select Audience</p>
                    </header>
                    <div className="content">
                        <p>Who can see your post?</p>
                        <span
                        >Your post will show up in News Feed, on your profile and in
                        search results.</span
                        >
                    </div>
                    <ul className="list">
                        <li>
                        <div className="column">
                            <div className="icon"><i className="fas fa-globe-asia"></i></div>
                            <div className="details">
                            <p>Public</p>
                            <span>Anyone on or off Facebook</span>
                            </div>
                        </div>
                        <div className="radio"></div>
                        </li>
                        <li className="active">
                        <div className="column">
                            <div className="icon"><i className="fas fa-user-friends"></i></div>
                            <div className="details">
                            <p>Friends</p>
                            <span>Your friends on Facebook</span>
                            </div>
                        </div>
                        <div className="radio"></div>
                        </li>
                        <li>
                        <div className="column">
                            <div className="icon"><i className="fas fa-user"></i></div>
                            <div className="details">
                            <p>Specific</p>
                            <span>Only show to some friends</span>
                            </div>
                        </div>
                        <div className="radio"></div>
                        </li>
                        <li>
                        <div className="column">
                            <div className="icon"><i className="fas fa-lock"></i></div>
                            <div className="details">
                            <p>Only me</p>
                            <span>Only you can see your post</span>
                            </div>
                        </div>
                        <div className="radio"></div>
                        </li>
                        <li>
                        <div className="column">
                            <div className="icon"><i className="fas fa-cog"></i></div>
                            <div className="details">
                            <p>Custom</p>
                            <span>Include and exclude friends</span>
                            </div>
                        </div>
                        <div className="radio"></div>
                        </li>
                    </ul>
                    </section>
                </div>
                </div>

                {/* <script>
                const container = document.querySelector(".container"),
                    privacy = container.querySelector(".post .privacy"),
                    arrowBack = container.querySelector(".audience .arrow-back");

                privacy.addEventListener("click", () => {
                    container.classList.add("active")
                })

                arrowBack.addEventListener("click", () => {
                    container.classList.remove("active")
                })
                </script> */}
        </>
    )
}

export default CreatePost