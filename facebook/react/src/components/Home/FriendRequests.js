import React from 'react';
import '../css/FriendRequests.css';
import {useEffect, useState} from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useHistory } from "react-router-dom";

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function FriendRequests() {
    const history = useHistory();
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/friend_requests/')
            .then(res => {
                setUsers(res.data);
        })
            .catch((err) => console.log(err))
    }, [])
    const frined_request_delete = (request_id,sender_id) => {
        const datarequest = {
            request_id: parseInt(request_id),
            sender_id: parseInt(sender_id),
        }
        axios.post("http://127.0.0.1:8000/api/frined_request_delete/",
        datarequest, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        },
        ).then(res => {
            history.push("/home/friendRequests/")
            axios.get('http://127.0.0.1:8000/api/friend_requests/')
            .then(res => {
                setUsers(res.data)
        })
            .catch((err) => console.log(err))
        }).catch((err) => console.log(err))
    }
    const frined_request_accept = (request_id,sender_id) => {
        const datarequest = {
            request_id: parseInt(request_id),
            sender_id: parseInt(sender_id),
        }
        axios.post("http://127.0.0.1:8000/api/frined_request_accept/",
        datarequest, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        },
        ).then(res => {
            history.push("/home/friendRequests/")
            axios.get('http://127.0.0.1:8000/api/friend_requests/')
            .then(res => {
                setUsers(res.data)
        })
            .catch((err) => console.log(err))
        }).catch((err) => console.log(err))
    }
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
                                        <Button onClick={(request_id,sender_id)=>{frined_request_delete(account.id,account.sender.id)}} >
                                            <CancelIcon />
                                        </Button>
                                        <Button onClick={(request_id,sender_id)=>{frined_request_accept(account.id,account.sender.id)}}>
                                            <CheckCircleIcon />
                                        </Button>
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