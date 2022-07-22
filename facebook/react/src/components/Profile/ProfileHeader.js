import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState,useEffect} from "react";
import { useLocation} from 'react-router-dom';
import CSRF from "../Auth/CSRF";
import axios from "axios";

function ProfileHeader() {
    const [users, setUsers] = useState({})
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get/')
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
                                <form action={`/home/updateprofile/`} method="post" encType="multipart/form-data">
                                <CSRF/>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Profile
                                            Picture</label>
                                        <input type="file" name="pic" className="form-control"
                                            id="exampleInputPassword1"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Cover
                                            Picture</label>
                                        <input type="file" name="cover" className="form-control"
                                            id="exampleInputPassword1"/>
                                    </div>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Close</Button>
                                <Button type="submit" autoFocus>
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
                               <img src={users.pic_cover} style={{width: "940px", height:"348px"}}/>
                                <div className="">
                                {/* profile photo */}
                                <img src={users.pic}
                                     className="rounded-full md:absolute top-48 inset-x-96 border-4 border-white w-40 h-40"
                                     style={{width: '168px', height: '168px'}}/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* // INFOS */}
                <div className="flex justify-center flex-col mt-5 mb-3.5">
                    <h1 className="text-center font-bold text-3xl">{users.first_name+' '+users.last_name}</h1>
                    <a href="#" className="text-center text-blue-700 font-semibold">Add Bio</a>
                    <hr className="full flex self-center w-2/3 mt-2"/>
                </div>
                {/* // END INFOS */}
                {/* // TABS */}
                <div className="w-full flex justify-center">
                    <div className="flex justify-between mb-2.5">
                        <ul className="flex px-5 py-1.5">
                            <li className="px-3 font-semibold text-gray-600"><a href="#">Posts</a></li>
                            <li className="px-3 font-semibold text-gray-600"><a href="#">About</a></li>
                            <li className="px-3 font-semibold text-gray-600"><a href="#">Friends</a></li>
                            <li className="px-3 font-semibold text-gray-600"><a href="#">Photos</a></li>
                            <li className="px-3 font-semibold text-gray-600"><a href="#">Story Archive</a></li>
                            <li className="px-3 font-semibold text-gray-600"><a href="#">More</a></li>
                        </ul>
                        <ul className="flex mb:pl-14">
                            <li className="px-2 font-semibold">
                                <button className="bg-blue-600 px-5 py-1 rounded-lg text-white font-semibold">
                                    <i className="bx bx-plus-circle text-xl mr-2"></i>
                                    Add to Story
                                </button>
                            </li>
                            <li className="px-2 font-semibold"><Button variant="contained"
                                                                       className="  bg-blue-600 px-5 py-1 rounded-lg text-white font-semibold "
                                                                       onClick={handleClickOpen}>
                                <i className="bx bx-plus-circle text-xl mr-2"></i>
                                Edit profile
                            </Button>
                            </li>

                            <li className="px-2 font-semibold">
                                <button className="bg-gray-200 px-3 py-1 rounded-lg text-black font-semibold">
                                    ...
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* // END TABS */}

            </div>
        </>
    )
}

export default ProfileHeader