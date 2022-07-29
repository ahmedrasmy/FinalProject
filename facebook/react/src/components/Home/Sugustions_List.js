import '../css/SearchResults.css';
import axios from 'axios';
import {useEffect, useState} from "react";
import CSRF from "../Auth/CSRF";
import Header from "../Header/Header";
import Sidebar from "./Sidebar";
import {Avatar} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';

function Sugustions_List() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/sugistions_list/')
            .then(res => {
                setUsers(res.data);
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }, [])
    return (
        <>
            <Header/>
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
                                                <div style={{marginLeft: "300px"}}></div>
                                                <div className="card m-2 ">
                                                    <div className="d-flex flex-row align-items-center">
                                                        <span className="friend-text align-items-center mr-2">Accept Friend Request</span>
                                                        <form action={'/home/frined_request_delete_sugustions/'} method="post">
                                                            <CSRF/>
                                                            <input type="hidden" name="request_id" value={account['pending_friend_request_id']}/>
                                                            <input type="hidden" name="sender_id" value={account['user_id']}/>
                                                            <Button type="submit" ><CancelIcon/></Button>
                                                        </form>
                                                        <form action={'/home/frined_request_accept_sugustions/'} method="post">
                                                            <CSRF/>
                                                            <input type="hidden" name="request_id" value={account['pending_friend_request_id']}/>
                                                            <input type="hidden" name="sender_id" value={account['user_id']}/>
                                                            <Button type="submit" ><CheckCircleIcon/></Button>
                                                        </form>
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
                                                <Avatar src={account['user_pic']} className="Posts_avatar"/>
                                                {account['user_name']}
                                                <br/>
                                                {account['user_email']}
                                                <div style={{marginLeft: "500px"}}></div>
                                                    {
                                                        account['request_sent'] === 1 ?
                                                            <div className="d-flex flex-column align-items-center">
                                                                <form action={'/home/cancel_friend_request_sugustions/'} method="post">
                                                                    <CSRF/>
                                                                    <input type="hidden" name="cancel_request"
                                                                        value={account['user_id']}/>
                                                                    <button type="submit" className="btn btn-danger">
                                                                        Cancel Friend Request
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        :   null
                                                    }
                                                    {
                                                        account['request_sent'] === -1 ?
                                                            <div className="d-flex flex-column align-items-center">
                                                                <form action={'/home/send_friend_request/'} method="post">
                                                                    <CSRF/>
                                                                    <input type="hidden" name="send_friend_request" value={account['user_id']}/>
                                                                    <button type="submit" className="btn btn-primary">
                                                                        Send Friend Request
                                                                    </button>
                                                                </form>
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