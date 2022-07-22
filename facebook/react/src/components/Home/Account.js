import React from 'react';
import '../css/Account.css';
import {Link, useLocation} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import CSRF from '../Auth/CSRF';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Cancel from '@mui/icons-material/Cancel';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Account() {
    let location = useLocation();
    let id = location.pathname.split('/')[3]
    let [user, setUser] = useState({})
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getAccount/'+id)
            .then(res => {
                setUser(res.data[0]);
                console.log(res.data[0])
        })
            .catch((err) => console.log(err))
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="d-flex flex-row justify-content-center flex-wrap align-items-start">
                    <div className="card profile-card m-2">
                    <div className="card-body">
                        <div className="d-flex flex-column justify-content-center p-4">
                            <div className="image-container mx-auto mb-4">
                                <img className="d-block border border-dark rounded-circle img-fluid mx-auto profile-image" alt="codingwithmitch logo" id="id_profile_image" src={user['pic']}/>
                                {/*pic*/}
                            </div>
                            <p className="mt-4 mb-1 field-heading">Email</p>
                            <h5>{user['email']}</h5>
                            {/*{is_self ?
                            :
                                % if hide_email %}
                                    <h5>**********</h5>
                                {% else %}
                                    <h5>{{email}}</h5>
                                {% endif %
                            }*/}
                            <p className="mt-4 mb-1 field-heading">Username</p>
                            <h5>{user['user_name']}</h5>
                            {/*<!-- If Auth user is viewing their own profile -->*/}
                            { user['is_self'] ?
                            <>
                                <a  class="mt-4 btn btn-primary" href="{% url 'account:edit' user_id=id %}">Update</a>
                                <div class="d-flex flex-column mt-4">
                                    <a class="m-auto" href="{% url 'password_change' %}">Change password</a>
                                </div>
                            </>
                            : null }
                        </div>
                    </div>
                    </div>
                    <div className="d-flex flex-column mb-4">
                        {user['request_sent'] === 0 ?
                        <div className="card m-2 p-4">
                            <div className="d-flex flex-row align-items-center">
                                <span className="friend-text align-items-center mr-2">Accept Friend Request</span>
                                <form action={'/home/frined_request_delete/'} method="post">
                                    <CSRF/>
                                    <input type="hidden" name="request_id" value={user['friend_request_id']}/>
                                    <input type="hidden" name="sender_id" value={user['id']}/>
                                    <input type="submit" className="btn btn-primary" id="sendFriendRequestBtn" value={CancelIcon}/>
                                    {/* <Button type="submit" ><CancelIcon/></Button> */}
                                </form>
                                <form action={'/home/frined_request_accept/'} method="post">
                                    <CSRF/>
                                    <input type="hidden" name="request_id" value={user['friend_request_id']}/>
                                    <input type="hidden" name="sender_id" value={user['id']}/>
                                    <input type="submit" className="btn btn-primary" id="sendFriendRequestBtn" value={CheckCircleIcon}/>
                                    {/* <Button type="submit" ><CheckCircleIcon/></Button>   */}
                                </form>
                            </div>
                        </div>
                        : null }
                        <div className="card m-2 px-4 pb-4">
                            {/*<!-- Cancel Friend Request / Send Friend Request / Remove Friend -->*/}
                            { user['is_friend'] === false && user['is_self'] === false ?
                                <>
                                    {/*<!-- You sent them a request -->*/}
                                    { user['request_sent'] === 1 ?
                                    <div className="d-flex flex-column align-items-center pt-4">
                                        <form action={'/home/cancel_friend_request/'} method="post">
                                            <CSRF/>
                                            <input type="hidden" name="cancel_request" value={user['id']}/>
                                            <button type="submit" className="btn btn-danger">
                                                Cancel Friend Request
                                            </button>
                                        </form>
                                    </div>
                                    :null }
                                    {/*<!-- No requests have been sent -->*/}
                                    { user['request_sent'] === -1 ?
                                        <div className="d-flex flex-column align-items-center pt-4">
                                            <form action={'/home/friend_request/'+user['id']} method="post">
                                                <CSRF/>
                                                <input type="submit" className="btn btn-primary" id="sendFriendRequestBtn" value="Send Friend Request"/>
                                            </form>
                                        </div>
                                    :null }
                                </>
                            : null }
                            {user['is_friend'] ?
                            <>
                                <div className="dropdown pt-4 m-auto">
                                    <form action={'/home/unfriend/'} method="post">
                                        <CSRF/>
                                        <input type="hidden" name="unfriend" value={user['id']}/>
                                        <input type="submit" className="btn btn-primary" id="sendFriendRequestBtn" value="unfriend"/>
                                    </form>
                                </div>
                            </>
                            : null }
                            {/*<!-- Friend list link -->*/}
                            { user['is_self'] ?
                            <>
                                <div className="d-flex flex-column pt-4">
                                <form action={'/home/Friends_list/'} method="post">
                                    <CSRF/>
                                    <button type="submit " >
                                        <span><GroupIcon/></span><span className="friend-text">Friends 
                                            { (user['friends']) === 0 ? <> </>
                                            :<>{user['friends']}</>   
                                            }
                                        </span>
                                    </button>
                                </form>
                            </div>
                            </>
                            : 
                            <div className="d-flex flex-column pt-4">
                                <a href="#">
                                    <div class="d-flex flex-row align-items-center justify-content-center icon-container">
                                        <span><GroupIcon/></span><span className="friend-text">Friends 
                                                { (user['friends']) === 0 ? <> </>
                                                :<>{user['friends']}</>   
                                                }
                                            </span> 
                                    </div>
                                </a>
                            </div> }
                        </div>
                        { user['friend_requests'] !== 0  && user['is_self'] === true ?
                            <div className="card m-2 px-4 pb-4">
                                {/*<!-- Friend requests -->*/}
                                <div className="d-flex flex-column pt-4">
                                    <a href="/home/friendRequests/">
                                        <div className="d-flex flex-row align-items-center justify-content-center icon-container">
                                            <span><PersonAddAltIcon/></span><span className="friend-text">Friend Requests </span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        : null }
                        {user['is_friend'] ?
                            <div className="d-flex flex-row align-items-center btn btn-primary m-2 px-4" onclick="createOrReturnPrivateChat('{{id}}')">
                                <ChatIcon/>
                                <span className="message-btn-text m-auto pl-2">Message</span>
                            </div>
                        : null }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Account
