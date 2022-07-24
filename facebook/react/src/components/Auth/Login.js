import React from "react";
import CSRF from "./CSRF";

function Login() {
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
                    <form className="login-form" action="/auth/login/" method="post" >
                        <CSRF/>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="Email" placeholder="Email address or phone number"
                                required/>
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" name="password" placeholder="Password" required/>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg btn-block mt-3">Login</button>
                        
                        <div className="text-center pt-3 pb-3">
                            <a href="#" className="">Forgotten password?</a>
                            <hr/>
                            <button type="button" className="btn btn-success btn-lg mt-3">Create New Account
                            </button>
                        </div>
                    </form>
                    <p className="pt-3 text-center"><b>Create a Page</b> for a celebrity, band or business.</p>
                </div>
            </div>
        </div>

    </>
}
export default Login;