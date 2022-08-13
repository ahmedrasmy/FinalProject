import '../css/SearchResults.css';
import axios from 'axios';
import {useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import {Avatar} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
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

function Sugustions_List() {
    const history = useHistory();
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/sugistions_list/')
            .then(res => {
                setUsers(res.data);
            })
            .catch((err) => console.log(err))
    }, [])
    const frined_request_delete_sugustions = (request_id,sender_id) => {
        const datarequest = {
            request_id: parseInt(request_id),
            sender_id: parseInt(sender_id),
        }
        axios.post("http://127.0.0.1:8000/api/frined_request_delete_sugustions/",
        datarequest, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        },
        ).then(res => {
            history.push("/home/sugistions_list/")
            axios.get('http://127.0.0.1:8000/api/sugistions_list/')
            .then(res => {
                setUsers(res.data);
            })
            .catch((err) => console.log(err))
        }).catch((err) => console.log(err))
    }
    const frined_request_accept_sugustions = (request_id,sender_id) => {
        const datarequest = {
            request_id: parseInt(request_id),
            sender_id: parseInt(sender_id),
        }
        axios.post("http://127.0.0.1:8000/api/frined_request_accept_sugustions/",
        datarequest, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        },
        ).then(res => {
            history.push("/home/sugistions_list/")
            axios.get('http://127.0.0.1:8000/api/sugistions_list/')
            .then(res => {
                setUsers(res.data);
            })
            .catch((err) => console.log(err))
        }).catch((err) => console.log(err))
    }
    const send_friend_request = (reciver_id) => {
        const datarequest = {
            reciver_id: parseInt(reciver_id),
        }
        axios.post("http://127.0.0.1:8000/api/send_friend_request/",
        datarequest, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        },
        ).then(res => {
            history.push("/home/pro/"+reciver_id)
        }).catch((err) => console.log(err))
    }
    const cancel_friend_request = (reciver_id) => {
        const datarequest = {
            reciver_id: parseInt(reciver_id),
        }
        axios.post("http://127.0.0.1:8000/api/cancel_friend_request_sugestions/",
        datarequest, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        },
        ).then(res => {
            history.push("/home/sugistions_list/")
            axios.get('http://127.0.0.1:8000/api/sugistions_list/')
            .then(res => {
                setUsers(res.data);
            })
            .catch((err) => console.log(err))
        }).catch((err) => console.log(err))
    }
    return (
        <>
            <div className="home_body">
                <Sidebar/>
                {users ?
                    <div className="all_posts"
                        style={{width: "1000px", height: "auto", marginRight: "250px"}}>
                        <header style={{fontWeight: "bold", marginLeft: "20px", marginTop: "20px"}}> People</header>
                        {
                            users.map((account) => {
                                return <>
                                    {
                                        account['request_sent'] === 0 ?
                                        <div className="Top_section">
                                            <Avatar src={account['user_pic']} className="Posts_avatar"/>
                                            {account['user_name']}
                                            <br/>
                                                {account['user_email']}
                                                <div style={{marginLeft: "400px"}}></div>
                                                <div className="card m-2 ">
                                                    <div className="d-flex flex-row align-items-center">
                                                        <span className="friend-text align-items-center mr-2">Accept Friend Request</span>
                                                            <Button onClick={(request_id,sender_id)=>{frined_request_delete_sugustions(account['pending_friend_request_id'],account['user_id'])}} >
                                                                <CancelIcon/>
                                                            </Button>
                                                            <Button onClick={(request_id,sender_id)=>{frined_request_accept_sugustions(account['pending_friend_request_id'],account['user_id'])}} >
                                                                <CheckCircleIcon/>
                                                            </Button>
                                                    </div>
                                                </div>
                                        </div>
                                        : null 
                                    }
                                    <hr style={{color: "gray"}}/>
                                </>
                            })
                        }
                        {
                            users.map((account) => {
                                return <>
                                    {
                                        account['request_sent'] === 1 || account['request_sent'] === -1 ? 
                                            <div className="Top_section">
                                                <a href={'/home/pro'+account['user_id']} style={{}}>
                                                <Avatar src={account['user_pic']} className="Posts_avatar"/>
                                                {account['user_name']}
                                                <p>{account['user_email']}</p>
                                                </a>
                                                <br/>
                                                
                                                <div style={{marginLeft: "400px"}}></div>
                                                    {
                                                        account['request_sent'] === 1 ?
                                                            <div className="d-flex flex-column align-items-center">
                                                                <button  className="bg-red-600 rounded-lg text-white font-semibold"
                                                                    style={{ marginRight: "15px", height: "40px", width: "250px" }} onClick={(reciver_id)=>{cancel_friend_request(account['user_id'])}} >
                                                                            Cancel Friend Request
                                                                </button>
                                                            </div>
                                                        :   null
                                                    }
                                                    {
                                                        account['request_sent'] === -1 ?
                                                            <div className="d-flex flex-column align-items-center">
                                                                <button onClick={(reciver_id)=>{send_friend_request(account['user_id'])}} className="bg-blue-600 rounded-lg text-white font-semibold"
                                                                        style={{ marginRight: "15px", height: "40px", width: "250px" }}>
                                                                        Send Friend Request
                                                                    </button>
                                                            </div>
                                                        : null
                                                    }
                                                    
                                            </div>
                                        : null
                                    }
                                    <hr style={{color: "gray"}}/>
                                </>
                            })
                        }
                    </div>
                    : <div className="d-flex flex-row flex-grow-1 justify-content-center align-items-center p-4">
                        <p>No results</p>
                    </div>
                }
            </div>
        </>
    )
}

export default Sugustions_List