import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import {useState,useEffect} from "react";
import CSRF from "../Auth/CSRF";
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatIcon from '@mui/icons-material/Chat';
import {useLocation} from 'react-router-dom';
import { Avatar } from '@mui/material';
import '../Post/CreatPost.css';

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

function ProfileHeader() {
    let location = useLocation();
    let id = location.pathname.split('/')[3]
    const [users, setUsers] = useState({})
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get_one_user/'+id)
            .then(res => {
                setUsers(res.data[0]);
            })
            .catch((err) => console.log(err))
    }, [])
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [openBio, setOpenBio] = React.useState(false);

    const handleClickOpenBio = () => {
        setOpenBio(true);
    };

    const handleCloseBio = () => {
        setOpenBio(false);
    };
    const [openAddStory, setopenAddStory] = React.useState(false);
    const handleastoryOpen = () => {
        setopenAddStory(true);
    };
    const handlestoryClose = () => {
        setopenAddStory(false);
    };
    const [imagecontent,setimagecontent] = useState('')
    const data  =
    {
        pic: imagecontent,
        user: parseInt(users.id),
    }
    const addNewٍStory =  ()=>{axios.post("http://127.0.0.1:8000/api/addStory/",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                },
            ).then(res => {
                setopenAddStory(false);
            }).catch((err) => console.log(err))
    }
    const [pic, setPic] = useState(null)
    const [picCover, setPicCover] = useState(null)
    function submit(e){
        e.preventDefault();
    }
    const sendpicsData = {
        pic:pic,
        pic_cover:picCover,
    }
    const updateProfilePics =  ()=>{axios.post("http://127.0.0.1:8000/api/updateprofile/",
                sendpicsData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                },
            ).then(res => {
                setOpen(false);
                console.log(res)

            }).catch((err) => console.log(err))
}
    return (
        <>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Edit Profile"}
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            <div style={{width: "1900px"}}>
                            </div>
                        </Typography>
                        <div className="modal-content">
                            <div className="modal-body">
                                <form onSubmit={(e) => submit(e) }   enctype="multipart/form-data" >
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Profile
                                            Picture</label>
                                        <input type="file" accept="image/*" name="pic" className="form-control"
                                            id="exampleInputPassword1" onChange={(e)=>setPic(e.target.files[0])}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Cover
                                            Picture</label>
                                        <input type="file" accept="image/*" name="cover" className="form-control"
                                            id="exampleInputPassword1" onChange={(e)=>setPicCover(e.target.files[0])}/>
                                    </div>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Close</Button>
                                    <Button type="submit" onClick={updateProfilePics} autoFocus>
                                        Submit
                                    </Button>
                                    </DialogActions>
                                </form>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
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
                            <img src={users['pic_cover']} style={{width: "940px", height:"348px"}}/>
                            <div className="">
                            {/* profile photo */}
                            <img src={users['pic']}
                                className="rounded-full md:absolute top-48 inset-x-96 border-4 border-white w-40 h-40"
                                style={{width: '168px', height: '168px'}}/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* // INFOS */}
                <div className="flex justify-center flex-col mt-5 mb-3.5">
                    <h1 className="text-center font-bold text-3xl">{users['user_name']}</h1>
                    {
                        users['is_self'] ? 
                            <a href="#" variant="contained" className="text-center text-blue-700 font-semibold" onClick={handleClickOpenBio}>
                                {users['Bio'] ? <>{users['Bio']}</>
                                : <>Add Bio</> 
                                }
                            </a>
                        :
                            <span className="text-center text-blue-700 font-semibold">
                                {users['Bio'] ? <>{users['Bio']}</>
                                : <></>
                                }
                            </span>
                    }
                    <hr className="full flex self-center w-2/3 mt-2"/>
                </div>
                {/* // END INFOS */}
                {/* // TABS */}
                <div className="w-full flex justify-center">
                    <div className="flex justify-between mb-2.5">
                        <ul className="flex px-5 py-1.5">
                            <li className="px-3 font-semibold text-gray-600"><a href="#">Posts</a></li>
                            <li className="px-3 font-semibold text-gray-600"><a href="#">About</a></li>
                            <li className="px-3 font-semibold text-gray-600">
                                {/*<!-- Friend list link -->*/}
                                { users['is_self'] ?
                                <> <a href="/home/Friends_list/" >
                                        {/* <span><GroupIcon/></span> */}
                                        Friends 
                                            { (users['friends']) === 0 ? <> </>
                                            :<>{users['friends']}</>   
                                            }
                                    </a>
                                </>
                                :  <a href="#">
                                        Friends 
                                        { (users['friends']) === 0 ? <> </>
                                        :<>{users['friends']}</>   
                                        }
                                    </a>
                                }
                            </li>
                            <li className="px-3 font-semibold text-gray-600"><a href="#">Photos</a></li>
                            <li className="px-3 font-semibold text-gray-600"><a href="#">Story Archive</a></li>
                            <li className="px-3 font-semibold text-gray-600"><a href="#">More</a></li>
                        </ul>
                        <ul className="flex mb:pl-14">
                            {
                                users['is_self'] ? 
                                <> 
                                    <li className="px-2 font-semibold">
                                        <button className="bg-blue-600 px-5 py-1 rounded-lg text-white font-semibold" onClick={handleastoryOpen}>
                                            Add to Story
                                        </button>
                                    </li>
                                    <li className="px-2 font-semibold">
                                        <Button variant="contained" className="  bg-blue-600 px-5 py-1 rounded-lg text-white font-semibold "onClick={handleClickOpen}>
                                            Edit profile
                                        </Button>
                                    </li>
                                </>  
                                :
                                    <>
                                        {users['request_sent'] === 0 ?
                                            <li className="px-2 font-semibold">
                                                <div className="d-flex flex-row align-items-center px-5 py-1 ">
                                                    <span className="friend-text align-items-center mr-2">Accept Friend Request</span>
                                                    <form action={'/home/frined_request_delete/'} method="post">
                                                        <CSRF/>
                                                        <input type="hidden" name="request_id" value={users['pending_friend_request_id']}/>
                                                        <input type="hidden" name="sender_id" value={users['id']}/>
                                                        <Button type="submit" ><CancelIcon/></Button>
                                                    </form>
                                                    <form action={'/home/frined_request_accept/'} method="post">
                                                        <CSRF/>
                                                        <input type="hidden" name="request_id" value={users['pending_friend_request_id']}/>
                                                        <input type="hidden" name="sender_id" value={users['id']}/>
                                                        <Button type="submit" ><CheckCircleIcon/></Button>
                                                    </form>
                                                </div>
                                            </li>
                                        : null }
                                        {/*<!-- Cancel Friend Request / Send Friend Request / Remove Friend -->*/}
                                        { users['is_friend'] === false && users['is_self'] === false ?
                                            <>
                                                {/*<!-- You sent them a request -->*/}
                                                { users['request_sent'] === 1 ?
                                                <li className="px-2 font-semibold">
                                                    <div className="d-flex flex-column align-items-center">
                                                        <form action={'/home/cancel_friend_request/'} method="post">
                                                            <CSRF/>
                                                            <input type="hidden" name="cancel_request" value={users['id']}/>
                                                            <button type="submit" className="btn btn-danger">
                                                                Cancel Friend Request
                                                            </button>
                                                        </form>
                                                    </div>
                                                </li>
                                                :null }
                                                {/*<!-- No requests have been sent -->*/}
                                                { users['request_sent'] === -1 ?
                                                <li className="px-2 font-semibold">
                                                    <div className="d-flex flex-column align-items-center">
                                                        <form action={'/home/send_friend_request/'} method="post">
                                                            <CSRF/>
                                                            <input type="hidden" name="send_friend_request" value={users['id']}/>
                                                            <input type="submit" className="btn btn-primary" id="sendFriendRequestBtn" value="Send Friend Request"/>
                                                        </form>
                                                    </div>
                                                </li>    
                                                :null }
                                            </>
                                        : null }
                                        {users['is_friend'] ?
                                            <>
                                            <li className="px-2 font-semibold">
                                                <div className="dropdown pt-4 m-auto">
                                                    <form action={'/home/unfriend/'} method="post">
                                                        <CSRF/>
                                                        <input type="hidden" name="unfriend" value={users['id']}/>
                                                        <input type="submit" className="btn btn-primary" id="sendFriendRequestBtn" value="unfriend"/>
                                                    </form>
                                                </div>
                                                <div className="d-flex flex-row align-items-center btn btn-primary m-2 px-4" onclick="createOrReturnPrivateChat('{{id}}')">
                                                    <ChatIcon/>
                                                    <span className="message-btn-text m-auto pl-2">Message</span>
                                                </div>
                                            </li>    
                                            </>
                                        : null }
                                    </>
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
                {/* // END TABS */}
                <Dialog
                    open={openBio}
                    onClose={handleCloseBio}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent dividers>
                        <div className="container" style={{height:'400px'}}>
                                <div className="wrapper">
                                    <section className="post">
                                    <header>Add Bio</header>
                                    <form action="/home/Bio/" method= "post" >
                                        < CSRF />
                                        <div className="content">
                                        <img src={users['pic']} alt="logo" />
                                        <div className="details">
                                            <p>{users['user_name']}</p>
                                        </div>
                                        </div>
                                        <textarea
                                        placeholder={"Enter your Bio here noope ?"+users['user_name']}
                                        spellcheck="false"
                                        required
                                        name="BioInput"
                                        ></textarea> 
                                        <button type='submit' >Post</button>
                                    </form>
                                    </section>
                                </div>
                            </div>
                    </DialogContent>
            </Dialog>
            <Dialog
                    open={openAddStory}
                    onClose={handlestoryClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent dividers>
                        <DialogContent dividers>
                            <div className="container">
                                <div className="wrapper">
                                    <section className="post">
                                    <header>Create Post</header>
                                        <div className="content">
                                        <Avatar src={users.pic}/>
                                        <div className="details">
                                            <p>{users.first_name+' '+users.last_name}</p>
                                        </div>
                                        </div>
                                        <div> 
                                            <input type="file" accept="image/*"
                                            className="post_input"
                                            onChange={(e) =>{setimagecontent(e.target.files[0])}}
                                            placeholder="Enter your image here"
                                            name ="imagecontent"/> 
                                        </div>
                                        <button onClick={addNewٍStory} style={{width:'100%'}}>Post</button>
                                    </section>
                                </div>
                            </div>
                        </DialogContent>
                    </DialogContent>
            </Dialog>
        </>
    )
}

export default ProfileHeader