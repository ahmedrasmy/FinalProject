import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import {useState,useEffect} from "react";
import CSRF from "../Auth/CSRF";
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatIcon from '@mui/icons-material/Chat';
import {useLocation} from 'react-router-dom';
import { Avatar } from '@mui/material';
import '../Post/CreatPost.css';
import Header from '../Header/Header';
import Post from '../Post/Post';
import AllPosts from '../Post/AllPosts';

function Groups() {
    const [users, setUsers] = useState({})
    const friends={
        is_member : 1 ,

    }
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getAllPosts/')
            .then(res => {
                setPosts(res.data);
            })
            .catch((err) => console.log(err))

    }, [])
    return (
        <>
            <Header />
            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog modal-lg">
                </div>
            </div>
            <div>
                <div className=" w-full flex justify-center w-80" style={{height: '348px'}}>
                    <div className="flex flex-col">
                        <div className="md:relative bg-gray-100 md:rounded-bl-lg md:rounded-br-lg
                        bg-gradient-to-b from-gray-100 via-gray-100 to-gray-400"
                            style={{width: '940px', height: '348px'}}>
                            <img src={users['pic_cover']} style={{width: "940px", height:"348px"}}/>
                        </div>
                    </div>
                </div>
                {/* // INFOS */}
                <div className="flex  flex-col mt-5 mb-3.5">
                    <h1 className="flex self-center w-2/3 mt-2 font-bold text-3xl">{users['user_name']} name of the group </h1>
                    <hr className="full flex self-center w-2/3 mt-2"/>
                </div>
                {/* // END INFOS */}
                {/* // TABS */}
                <div className="w-full flex justify-center">
                    <div className="flex justify-between mb-2.5">
                        <ul className="flex px-5 py-1.5">
                            <li className="px-3 font-semibold text-gray-600"><a href="#">About</a></li>
                            <li className="px-3 font-semibold text-gray-600"><a href="#">Discussion</a></li>
                            <li className="px-3 font-semibold text-gray-600">People</li>
                            <li className="px-3 font-semibold text-gray-600"><a href="#">Photos</a></li>
                            <li className="px-3 font-semibold text-gray-600"><a href="#">More</a></li>
                        </ul>
                        <ul className="flex mb:pl-14"> 
                            <li className="px-2 font-semibold">
                                <button className="bg-blue-600  py-1 rounded-lg text-white font-semibold" >
                                    join
                                </button>
                            </li>
                            <li className="px-2 font-semibold">
                                <button className="bg-blue-600  py-1 rounded-lg text-white font-semibold" >
                                    invite
                                </button>
                            </li>
                            <li className="px-2 font-semibold">
                                <button className="bg-gray-200 px-3 py-1 rounded-lg text-black font-semibold">
                                    ...
                                </button>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </div>
            <div className=" w-full flex justify-center w-80">
                <div className="flex flex-col">
                    <div className="md:relative bg-gray-100 md:rounded-bl-lg md:rounded-br-lg
                    bg-gradient-to-b from-gray-100 via-gray-100 to-gray-400"
                    style={{width: '940px'}}>
                    <div className="row " style={{width: '940px'}}>
                        <div className="col" style={{margin:"5px",paddingTop:"10px"}}>
                            <div className="row">
                                <div style={{marginBottom:"10px",width:"100%"}}>
                                    <Post poll="0" />
                                </div> 
                                <div style={{marginBottom:"10px",width:"100%"}}>
                                    {
                                        posts.map((post) => {
                                            return < >
                                                <
                                                    AllPosts profilePic={post.user.pic}
                                                            post_id={post.id}
                                                            message={post.postcontent}
                                                            timestamp={post.postdate}
                                                            username={post.user.first_name + ' ' + post.user.last_name}
                                                            image={post.post_photos}
                                                            comments={post.post_comments}
                                                            user_id={post.user.id}
                                                /> 
                                                </>
                                        })
                                    }
                                </div> 
                            </div>
                        </div>
                        <div className="col " style={{margin:"5px",paddingTop:"10px"}}>
                            <div className="row " >
                                <div style={{marginBottom:"10px",backgroundColor:"white",height: '348px',width:"100%"}}>
                                    
                                </div>
                                <div style={{marginBottom:"10px",backgroundColor:"white",height: '348px',width:"100%"}}>
                                    
                                </div>
                                <div style={{marginBottom:"10px",backgroundColor:"white",height: '348px',width:"100%"}}>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default Groups