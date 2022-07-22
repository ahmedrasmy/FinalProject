import React from 'react';
import '../css/FriendRequests.css';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useEffect, useState} from "react";
import axios from "axios";
import CSRF from '../Auth/CSRF';
import Button from '@mui/material/Button';

function FriendRequests() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/friend_requests/')
            .then(res => {
                setUsers(res.data);
                console.log(res.data)
        })
            .catch((err) => console.log(err))
    }, [])
    return (
        <div className="container">
            <div className="card p-2">
                { users ?
                <div className="d-flex flex-row flex-wrap">
                    {  
                        users.map((account) => {
                            return <>
                                <div className="card flex-row flex-grow-1 p-2 mx-2 my-2 align-items-center col-4">
                                    <a className="profile-link" href={'/home/account/'+account.sender.id}>
                                        <div className="card-image m-2">
                                            <img className="img-fluid profile-image" src={account.sender.pic} alt=""/>
                                        </div>
                                    </a>
                                    <a className="profile-link" href={'/home/account/'+account.sender.id}>
                                        <div className="card-center px-2">
                                            <h4 className="card-title">{account.sender.first_name+' '+account.sender.last_name}</h4>
                                        </div>
                                    </a>
                                    <div className="d-flex flex-row card-right flex-grow-1 justify-content-end mx-2">
                                        <form action={'/home/frined_request_delete/'} method="post">
                                            <CSRF/>
                                            <input type="hidden" name="request_id" value={account.id}/>
                                            <input type="hidden" name="sender_id" value={account.sender.id}/>
                                            <input type="submit" className="btn btn-primary" id="sendFriendRequestBtn" value={CancelIcon}/>
                                            {/* <Button type="submit" ><CancelIcon/></Button> */}
                                        </form>
                                        <form action={'/home/frined_request_accept/'} method="post">
                                            <CSRF/>
                                            <input type="hidden" name="request_id" value={account.id}/>
                                            <input type="hidden" name="sender_id" value={account.sender.id}/>
                                            <input type="submit" className="btn btn-primary" id="sendFriendRequestBtn" value={CheckCircleIcon}/>
                                            {/* <Button type="submit" ><CheckCircleIcon/></Button>   */}
                                        </form>
                                    </div>
                                </div>
                                </>
                        })               
                    }
                </div>
                : 
                <div className="d-flex flex-row flex-grow-1 justify-content-center align-items-center p-4">
                    <p>No results</p>
                </div>
                }
            </div>  
        </div>
    )
}

export default FriendRequests