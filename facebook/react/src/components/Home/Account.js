import React from 'react';
import '../css/Account.css';
import {Link, useLocation} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";

function Account() {
    const [email,setemail]= useState("email");
    const [username,setusername]= useState("username");
    const [pic,setpic]= useState("pic");
    const [request_sent,setrequest_sent]= useState(1);
    const [is_friend,setis_friend]= useState(true);
    const [friends,setfriends]= useState(true);
    const [friend_requests,setfriend_requests]= useState(true);
    const [is_self,setis_self]= useState(false);
    const onFriendRequestSent=(e)=>{
        window.location.reload()
    }
    const onFriendRequestCancelled=(e)=>{
        window.location.reload()
    }
    const onFriendRemoved=(e)=>{
        window.location.reload()
    }
    const onFriendRequestAccepted=(e)=>{
        window.location.reload()
    }
    const onFriendRequestDeclined=(e)=>{
        window.location.reload()
    }
    let arr=[]
    let location = useLocation();
        let id = location.pathname.split('/')[3]
        let pk = location.pathname.split('/')[4]
        let [user, setUser] = useState({})
        useEffect(() => {
            axios.get('http://127.0.0.1:8000/api/getAccount/'+id+'/'+pk)
                .then(res => {
                    setUser(res.data);
                    console.log(res.data)
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
                                <img className="d-block border border-dark rounded-circle img-fluid mx-auto profile-image" alt="codingwithmitch logo" id="id_profile_image" src={user[3]}/>
                                {/*pic*/}
                            </div>
                            <p className="mt-4 mb-1 field-heading">Email</p>
                            <h5>{user[2]}</h5>
                            {/*{is_self ?
                                
                            :
                                % if hide_email %}
                                    <h5>**********</h5>
                                {% else %}
                                    <h5>{{email}}</h5>
                                {% endif %
                            }*/}
                            <p className="mt-4 mb-1 field-heading">Username</p>
                            <h5>{user[1]}</h5>
                            {/*<!-- If Auth user is viewing their own profile -->*/}
                            {/*% if is_self %}
                            <a  class="mt-4 btn btn-primary" href="{% url 'account:edit' user_id=id %}">Update</a>
                            <div class="d-flex flex-column mt-4">
                                <a class="m-auto" href="{% url 'password_change' %}">Change password</a>
                            </div>
                            {% endif %*/}
                        </div>
                    </div>
                    </div>
                    {/*% if request.user.is_authenticated %*/}
                    <div className="d-flex flex-column mb-4">
                        {user[7] ?
                        <div className="card m-2 p-4">
                            <div className="d-flex flex-row align-items-center">
                                <span className="friend-text align-items-center mr-2">Accept Friend Request</span>
                                <span id={'id_cancel_'} className="decline-friend-request material-icons p-1" >cancel</span>
                                <span id="id_confirm_{{id}}" className="confirm-friend-request material-icons p-1" >check</span>
                            </div>
                        </div>
                        : null }

                        <div className="card m-2 px-4 pb-4">
                            {/*<!-- Cancel Friend Request / Send Friend Request / Remove Friend -->*/}
                            { user[6] === false && user[5] === false ?
                                <>
                                    {/*<!-- You sent them a request -->*/}
                                    { user[7] === 1 ?
                                    <div className="d-flex flex-column align-items-center pt-4">
                                        <button className="btn btn-danger" id="id_cancel_friend_request_btn">
                                            Cancel Friend Request
                                        </button>
                                    </div>
                                    :null }
                                    {/*<!-- No requests have been sent -->*/}
                                    { user[7] === -1 ?
                                        <div className="d-flex flex-column align-items-center pt-4">
                                            <button className="btn btn-primary" id="id_send_friend_request_btn">
                                                Send Friend Request
                                            </button>
                                        </div>
                                    :null }
                                </>
                            : null }
                                
                                
                            { user[6] ?
                                <div className="dropdown pt-4 m-auto">
                                    <button className="btn btn-secondary dropdown-toggle friends-btn" type="button" id="id_friends_toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Friends
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="id_friends_toggle">
                                        <a className="dropdown-item" href="#" >Unfriend</a>
                                    </div>
                                </div>
                            : null }
                            {/*<!-- Friend list link -->*/}
                            <div className="d-flex flex-column pt-4">
                                <a href="#">
                                    <div className="d-flex flex-row align-items-center justify-content-center icon-container">
                                        <span className="material-icons mr-2 friends-icon">contact_page</span><span className="friend-text">Friends </span>
                                    </div>
                                </a>
                            </div>

                        </div>

                        { user[8] ?
                            <div className="card m-2 px-4 pb-4">
                                {/*<!-- Friend requests -->*/}
                                <div className="d-flex flex-column pt-4">
                                    <a href="#">
                                        <div className="d-flex flex-row align-items-center justify-content-center icon-container">
                                            <span className="material-icons mr-2 person-add-icon">person_add</span><span className="friend-text">Friend Requests </span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        : null }

                        {user[6] ?
                            <div className="d-flex flex-row align-items-center btn btn-primary m-2 px-4" onclick="createOrReturnPrivateChat('{{id}}')">
                                <span className="material-icons m-auto">
                                message
                                </span>
                                <span className="message-btn-text m-auto pl-2">Message</span>
                            </div>
                        : null }

                    </div>
                    {/*% endif %*/}

                    
                </div>
            </div>
            {/*
            <script type="text/javascript">

                // called from base_js.html
                //preloadImage("{{profile_image|safe}}", 'id_profile_image')
                
                const sendFriendRequestBtn = document.getElementById("id_send_friend_request_btn")
                if (sendFriendRequestBtn != null){
                    sendFriendRequestBtn.addEventListener("click", function(){
                        //sendFriendRequest("{{id}}", onFriendRequestSent)
                    })
                }

                const cancelFriendRequestBtn = document.getElementById("id_cancel_friend_request_btn")
                if(cancelFriendRequestBtn != null){
                    cancelFriendRequestBtn.addEventListener("click", function(){
                        //cancelFriendRequest("{{id}}", onFriendRequestCancelled)
                    })
                }

                const removeFriendBtn = document.getElementById("id_unfriend_btn")
                if (removeFriendBtn != null){
                    removeFriendBtn.addEventListener("click", function(){
                        //removeFriend("{{id}}", onFriendRemoved)
                    })
                }

                function triggerAcceptFriendRequest(friend_request_id){
                    //acceptFriendRequest(friend_request_id, onFriendRequestAccepted)
                }

                function triggerDeclineFriendRequest(friend_request_id){
                    //declineFriendRequest(friend_request_id, onFriendRequestDeclined)
                }
                
            </script>*/}
        </>
    )
}

export default Account
