import React from 'react';
import '../css/Account.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useEffect, useState} from "react";
import axios from "axios";

function Friends_List() {
    const [friends, setfriends] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/friends_list_contacts/')
            .then(res => {
                setfriends(res.data);
                console.log(res.data)
        })
            .catch((err) => console.log(err))
    }, [])
    return (
        <>
            <div className="container">
                <div className="card p-2">
                    {friends ? 
                        <>
                            <div className="d-flex flex-row flex-wrap">
                                { 
                                    friends.map ((friend) => {
                                        return <>
                                            <div className="card flex-row flex-grow-1 p-2 mx-2 my-2 align-items-center col-4">
                                                <a className="profile-link" href={'/home/pro/'+friend.id}>
                                                    <div className="card-image m-2">
                                                        <img className="img-fluid profile-image" src={friend.pic} alt="" />
                                                    </div>
                                                </a>
                                                <div className="card-center px-2">
                                                    <a className="profile-link" href={'/home/pro/'+friend.id}>
                                                        <h4 className="card-title">{friend.username}</h4>
                                                    </a>
                                                    <a href={"/chats/detail/"+friend.id} >Send a Message</a>      
                                                </div>
                                                <div className="d-flex flex-row card-right flex-grow-1 justify-content-end mx-2">
                                                <div className="d-flex flex-row friends-text-container p-3">
                                                    <p className="friends-text m-auto">Friends</p>
                                                    <span><CheckCircleIcon/></span>
                                                </div>
                                                </div>
                                            </div>
                                        </>
                                    })
                                }
                            </div>
                        </>
                    :
                        <div class="d-flex flex-row flex-grow-1 justify-content-center align-items-center p-4">
                            <p>No friends :(</p>
                        </div>
                    }
                </div>  
            </div>
        </>
    )
}
export default Friends_List