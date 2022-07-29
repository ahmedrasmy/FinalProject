import React from 'react'
import './detail.css';
import {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';
import axios from "axios";

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

function Detail() {
    const [user,setuser]=useState([])
    const [friend, setfriend] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get/')
            .then(res => {
                setuser(res.data[0]);
            })
            .catch((err) => console.log(err))
    }, [])
    let location = useLocation();
    let id = location.pathname.split('/')[3]
    console.log(id)
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get_one_user/'+id)
            .then(res => {
                setfriend(res.data[0]);
        })
            .catch((err) => console.log(err))
    }, [])
    const [chats,setchats]=useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/detail/'+id)
            .then(res => {
                setchats(res.data);
        })
            .catch((err) => console.log(err))
    }, [])
    console.log(chats)
    var counter 
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/detail_counter/'+id)
            .then(res => {
                counter=res.data
        })
            .catch((err) => console.log(err))
    }, [])
    const [msg,setmsg] = useState('')
    function handleReg(e){
        const newData = e.target.value
        setmsg(newData)
    }
    const data  =
    {
        body: msg,
        msg_sender: parseInt(user.id),
        msg_receiver: parseInt(id),
    }
    const addNewMessage = ()=>{axios.post("http://127.0.0.1:8000/api/sent_msg/"+id,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                },
            ).then(res => {
                let chat_body = document.getElementById('chat-body')
                let chatMessageBox = document.createElement("div")
                chatMessageBox.classList.add("chat-box-sent")
                chatMessageBox.innerText = data.body
                chat_body.append(chatMessageBox)
                data = ""
                document.getElementById("body").value=""
            }).catch((err) => console.log(err))
        document.getElementById("body").value=""
        setmsg('')
    }
    useEffect(() => {
        const interval = setInterval(() => {
                    console.log(counter,"brfore")
                    let url ='http://127.0.0.1:8000/api/rec_msg/'+id
                        fetch(url)
                        .then(response => response.json())
                        .then(data => {
                        console.log('Success:', data);
                        if(data.length === 0){}
                        else{
                            let lastMsg = data[data.length-1]
                            if(counter == data.length){
                                console.log("there is no new chat")
                            }
                            else{
                                let chat_body = document.getElementById('chat-body')
                                let chatMessageBox = document.createElement("div")
                                chatMessageBox.classList.add("chat-box-received")
                                chatMessageBox.innerText = lastMsg
                                chat_body.append(chatMessageBox)
                            }
                        }
                        counter=data.length
                        })
                        .catch((err) => console.log(err))
                        console.log(counter,"after")
        }, 2000);

        return () => clearInterval(interval);
        }, []);
    return (
        <>
            <div className="chat-container2">
                <div className="identity">
                    <div>
                        <a href="/chats/index/">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                fill="currentColor"
                                className="bi bi-house"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                                />
                                <path
                                    fill-rule="evenodd"
                                    d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                                    />
                            </svg>
                        </a>
                    </div>

                    <h3 style={{color: "black"}}>{friend.first_name}</h3>
                    <div className="pro-pic">
                        <img src={friend.pic} alt="profile-picture"/>
                    </div>
                    </div>
                    <div className="sub-container">
                        <div className="chat-body" id="chat-body">
                            {
                                chats.map((chat)=>{
                                    return <>
                                        {
                                            chat.msg_sender === parseInt(user.id) && chat.msg_receiver === parseInt(friend.id) ?
                                                <div className="chat-box-sent">
                                                    {chat.body}
                                                </div>
                                            : <>{
                                                chat.msg_sender === parseInt(friend.id) && chat.msg_receiver === parseInt(user.id)?
                                                <div className="chat-box-received">
                                                    {chat.body}
                                                </div>
                                                : null }
                                            </>
                                        }
                                    </>
                                })
                            }
                            <div className="chat-box-sent" id="chat-box-sent" style={{display: "none"}}>
                            </div>
                        </div>
                            <div className="form" style={{color: "black"}}>
                                <input type="text"
                                    style={{color: "black"}}
                                    placeholder="Type message Here "
                                    required
                                    onChange={(e) =>{handleReg(e)}}
                                    name="body"
                                    id="body"
                                    value={msg}
                                    />
                                <button onClick={addNewMessage}>Send</button>
                            </div>
                    </div>
                </div>
        </>
    )
}

export default Detail