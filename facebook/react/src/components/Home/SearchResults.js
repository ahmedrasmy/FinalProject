import '../css/SearchResults.css';
import axios from 'axios';
import {useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import {Avatar, IconButton} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import {useLocation} from "react-router-dom";
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


function SearchResults() {
    const history = useHistory();
    let location = useLocation();
    let id = location.pathname.split('/')[3]
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get_all_users/' + id)
            .then(res => {
                setUsers(res.data);
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }, [id])
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
        axios.post("http://127.0.0.1:8000/api/cancel_friend_request/",
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
    return (
        <>
            <div className="home_body">
                <Sidebar/>

                {users ?
                    <div className="all_posts"
                        style={{width: "1000px", height: "auto", marginRight: "250px"}}>
                        <header style={{fontWeight: "bold", marginLeft: "20px", marginTop: "20px"}}> search results</header>

                        {

                            users.map((account, index) => {
                                return <>

                                    <div className="Top_section">
                                        <a href={'/home/pro/'+account['id']}>
                                        <Avatar src={account['pic']} className="Posts_avatar"/>
                                        <p>{account['user_name']}</p>
                                        <p>{account['email']}</p>
                                        </a>
                                        <br/>
                                        <div style={{marginLeft: "400px"}}></div>
                                        {
                                            account['is_self'] ? <div>This is you</div> : <div>
                                                {
                                                    account['is_friend'] === true ? 
                                                    <a href={'/chats/detail/'+account['id']}>
                                                    <button>
                                                        <IconButton>
                                                            <ForumIcon/>
                                                        </IconButton>
                                                    </button></a> :
                                                        <>
                                                            {account['request_sent'] === 1 ?
                                                                <div className="d-flex flex-column align-items-center">
                                                                    <button  className="bg-red-600 rounded-lg text-white font-semibold"
                                                                    style={{ marginRight: "15px", height: "40px", width: "250px" }} onClick={(reciver_id)=>{cancel_friend_request(account['id'])}} >
                                                                            Cancel Friend Request
                                                                    </button>
                                                                </div>
                                                                : null}
                                                            {account['request_sent'] === -1 ?
                                                                <div className="d-flex flex-column align-items-center">
                                                                    <button onClick={(reciver_id)=>{send_friend_request(account['id'])}} className="bg-blue-600 rounded-lg text-white font-semibold"
                                                                        style={{ marginRight: "15px", height: "40px", width: "250px" }}>
                                                                        Send Friend Request
                                                                    </button>
                                                                </div>
                                                                : null}
                                                        </>


                                                }

                                            </div>

                                        }

                                    </div>

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

export default SearchResults