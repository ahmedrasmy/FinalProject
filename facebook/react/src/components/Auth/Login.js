import React, { useState } from "react";
import jQuery from "jquery";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function Login() {
    let history = useHistory();
    function submit(e){
        e.preventDefault();
     }
    const [email,setemail]=useState('')
    const [pass,setpass]=useState('')
    const userData = {
        email:email,
        password:pass
     }
     const [show,setshoe]=useState(null)
     const loginUser =  ()=>{axios.post("http://127.0.0.1:8000/api/login_user/",
                    userData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': getCookie('csrftoken')
    
                        }
                    },
                ).then(res => {
                    if(res.data.length === 1){
                        setshoe(res.data[0])
                    }else{
                        history.push("/home/Home/" )
                    }
                }).catch((err) => console.log(err))
    }
    
    return < >
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:300i,400,700&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"/>
        <div className="container-fluid">
            <div className="row align-items-center justify-content-center vh-100">
                <div className="col-md-7">
                    <div className="row-md-3 "><img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
                                                    className="w-50"/></div>
                    <h3 style={{fontSize: "28px"}}>Facebook helps you connect and share with the people in your
                        life.</h3>
                </div>
                <div className="col-md-5">
                    <form className="login-form" onSubmit={(e) => submit(e) }>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="Email" placeholder="Email address or phone number"
                                onChange={(e) => setemail(e.target.value)}
                                required/>
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" name="password" placeholder="Password"  onChange={(e) => setpass(e.target.value)}required/>
                        </div>
                        {
                            show === null ? <></>
                            :
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="error">{show}</Alert>
                                </Stack>
                        }
                        <button type="submit"  onClick={loginUser} className="btn btn-primary btn-lg btn-block mt-3" >Login</button>
                        <div className="text-center pt-3 pb-3">
                            <a href="#" className="">Forgotten password?</a>
                            <hr/>
                            <a href="/auth/register" className="btn btn-success btn-lg mt-3">Create New Account
                            </a>
                        </div>
                    </form>
                    <p className="pt-3 text-center"><b>Create a Page</b> for a celebrity, band or business.</p>
                </div>
            </div>
        </div>

    </>
}
export default Login;