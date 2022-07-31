import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import CSRF from "../Auth/CSRF";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatIcon from '@mui/icons-material/Chat';
import {useLocation} from 'react-router-dom';
import { Avatar } from '@mui/material';
import '../Post/CreatPost.css';
import Header from '../Header/Header';
import Post from '../Post/Post';
import AllPosts from '../Post/AllPosts';
import {useEffect, useState} from "react";
import axios from "axios";

function Groups() {
    let location = useLocation();
    let id = location.pathname.split('/')[3]
    const [group, setgroup] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get_group/' + id)
            .then(res => {
                setgroup(res.data[0]);
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }, [id])
    const [user, setUser] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get_user_for_group/'+ id)
            .then(res => {
                setUser(res.data);
            })
            .catch((err) => console.log(err))
    }, [])
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getpostforgroup/'+id)
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
                            <img src={group.group_pic} style={{width: "940px", height:"348px"}}/>
                        </div>
                    </div>
                </div>
                {/* // INFOS */}
                <div className="flex  flex-col mt-5 mb-3.5">
                    <h1 className="flex self-center w-2/3 mt-2 font-bold text-3xl">{group.group_name} </h1>
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
                                {
                                    user['is_member'] === false ?
                                    <>
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
                                    </>
                                    :
                                        <li className="px-2 font-semibold">
                                            <div class="dropdown">
                                                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    join
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">leave group</a></li>
                                                    {/* <li><a class="dropdown-item" href="#">Something else here</a></li> */}
                                                </ul>
                                            </div>
                                        </li>
                                }
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
                                {    
                                    user['is_member'] === true ?
                                        <div style={{marginBottom:"10px",width:"100%"}}>
                                            <Post poll="0" group_id={id}/>
                                        </div>
                                    : null
                                } 
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
                                                            group_id={id}
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
                                    <h4>About</h4>
                                    <p>{group.About_group}</p>
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