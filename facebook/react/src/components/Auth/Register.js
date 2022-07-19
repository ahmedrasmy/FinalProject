import {useState} from "react";

import CSRF from "./CSRF";

function Register() {

    const [Register, setRegister] = useState({
        firstname: "",
        lastname: "",
        phone:"",
        email: "",
        password: "",
        confirm: ""
    })
    const [errors, setErrors] = useState({
        firstname: "",
        lastname: "",
        phone:"",
        email: "",
        password: "",
        confirm: ""
    })
    const changeData = (e) => {
        if (e.target.name === "lastname") {
            setRegister({
                ...Register,
                lastname: e.target.value
            })
            setErrors({
                ...errors,
                lastname:
                    e.target.value.length === 0 ?
                        "this field is required"
                        : !e.target.value.match(/^\S*$/) ?
                            "Must Be cleaned" :
                            null
            })


        } else if (e.target.name === "Email") {
            setRegister({
                ...Register,
                email: e.target.value
            })
            setErrors({
                ...errors,
                email:
                    e.target.value.length === 0 ?
                        "this field is required" :
                        !e.target.value.match(/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/) ?
                            "Invalid Email Enter Valid "
                            : null
            })
        }  else if (e.target.name === "password") {
            setRegister({
                ...Register,
                password: e.target.value
            })
            setErrors({
                ...errors,
                password:
                    e.target.value.length === 0 ?
                        "this field is required" :
                        !e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/) ?
                            "Invalid Password "
                            : null
            })


        } else if (e.target.name === "confirm") {
            setRegister({
                ...Register,
                confirm: e.target.value
            })
            setErrors({
                ...errors,
                confirm:
                    e.target.value.length === 0 ?
                        "this field is required" :
                        !e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/) ?
                            "Invalid Password "
                            : Register.password !== e.target.value ?
                                "Must be identical" :
                                null
            })


        } else if (e.target.name === "firstname") {
            setRegister({
                ...Register,
                firstname: e.target.value
            })
            setErrors({
                ...errors,
                firstname:
                    e.target.value.length === 0 ?
                        "this field is required"
                        : !e.target.value.match(/^\S*$/) ?
                            "Must Be cleaned" :
                            null
            })

        }
        else if (e.target.name === "phone") {
            setRegister({
                ...Register,
                phone: e.target.value
            })
            setErrors({
                ...errors,
                phone:
                    e.target.value.length === 0 ?
                        "this field is required" :
                        !e.target.value.match(/^01[0125][0-9]{8}$/) ?
                            "Invalid Phone Number "
                            : null
            })


        }
    }


    return < >
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:300i,400,700&display=swap"
              rel="stylesheet"/>
        <link rel="stylesheet"
              href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"/>
        <div className="row-cols-md-3 text-center"><img height="100px"
                                                        src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"/>
        </div>

        <section className="vh-100 gradient-custom">
            <div className="container ">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-5 col-l-7">
                        <div className="card shadow-2-strong card-registration" style={{borderRadius: '15px'}}>
                            <div className="card-body p-4 ">
                                <div className="mb-4 pb-2 pb-md-0  text-center "
                                     style={{
                                         fontSize: '25px',
                                         lineHeight: '32px',
                                         textAlign: 'center',
                                         fontWeight: 'bold'
                                     }}>
                                    Create a new account
                                    <h5 className="mb-4 pb-2 pb-md-0  text-center">It's quick and easy.</h5>
                                </div>

                                <hr style={{
                                    height: "2px",
                                    width: "100%",
                                    borderWidth: '0',
                                    color: "rgb(90, 90, 90)",
                                    backgroundColor: "rgb(90, 90, 90)"
                                }}/>
                                <form  method='post' action='/chats/register/'>
                                    <CSRF/>
                                    <div className="row">
                                        <div className="col-md-6">

                                            <div className="form-outline">
                                                <input type="text" name="firstname"
                                                       className="form-control form-control-lg"
                                                       placeholder="Firstname"
                                                         value={Register.firstname}
                                                       onChange={(e) => changeData(e)}/>
                                            </div>
                                          <p className="text-danger">  {errors.firstname}  </p>
                                        </div>
                                        <div className="col-md-6 mb-4">

                                            <div className="form-outline">
                                                <input type="text" name="lastname"
                                                       className="form-control form-control-lg"
                                                       placeholder="Lastname"
                                                       value={Register.lastname}
                                                       onChange={(e) => changeData(e)}/>
                                            </div>
                                               <p className="text-danger">  {errors.lastname}  </p>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12 mb-4 d-flex align-items-center">

                                            <div className="form-outline datepicker w-100">
                                                <input type="text" className="form-control form-control-lg"
                                                       name="Email"
                                                       placeholder=" Email address"
                                                       value={Register.email}
                                                       onChange={(e) => changeData(e)}/>
                                                <p className="text-danger">  {errors.email}  </p>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-md-12 mb-4 d-flex align-items-center">

                                            <div className="form-outline datepicker w-100">
                                                <input type="text" className="form-control form-control-lg"
                                                       name="phone"
                                                       placeholder="Mobile Phone"  value={Register.phone}
                                                       onChange={(e) => changeData(e)}/>
                                                <p className="text-danger">  {errors.phone}  </p>


                                            </div>

                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 mb-4  d-flex align-items-center">

                                            <div className="form-outline datepicker w-100">
                                                <input type="password" className="form-control form-control-lg"
                                                       name="password" placeholder="password" value={Register.password}
                                                       onChange={(e) => changeData(e)}/>
                                                <p className="text-danger">  {errors.password}  </p>

                                            </div>

                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-12  d-flex align-items-center">

                                            <div className="form-outline datepicker w-100">
                                                <input type="password" className="form-control form-control-lg"
                                                       name="confirm" placeholder="Confirm password"
                                                        value={Register.confirm}
                                                       onChange={(e) => changeData(e)}/>
                                                <p className="text-danger">  {errors.confirm}  </p>

                                            </div>

                                        </div>

                                    </div>


                                    <div className="row">
                                        <div className="col-md-12  pb-2">

                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="emailAddress">Date of
                                                    birth</label>
                                                <input type="date" id="emailAddress"
                                                       className="form-control form-control-lg"
                                                        name="birthdate"/>

                                            </div>


                                        </div>
                                    </div>

                                    <div className="row p-md-1">
                                        <div className="col-12">


                                            <h6 className="mb-2 pb-1">Gender: </h6>

                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio"
                                                       name="inlineRadioOptions" id="femaleGender"
                                                       value="Female"/>
                                                <label className="form-check-label"
                                                       htmlFor="femaleGender">Female</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio"
                                                       name="inlineRadioOptions" id="maleGender"
                                                       value="Male"/>
                                                <label className="form-check-label"
                                                       htmlFor="maleGender">Male</label>
                                            </div>




                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <p className="_58mv ">People who use our service may have uploaded
                                                your contact information to Facebook. <a
                                                    href="help/637205020878504 " id="non-users-notice-link "
                                                    target="_blank " rel="nofollow ">Learn more</a>.</p>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <p className="_58mv">By clicking Sign Up, you agree to our <a
                                                href="/legal/terms/update" id="terms-link" target="_blank"
                                                rel="nofollow">Terms</a>, <a href="/about/privacy/update"
                                                                             id="privacy-link" target="_blank"
                                                                             rel="nofollow">Data
                                                Policy</a> and <a href="/policies/cookies/" id="cookie-use-link"
                                                                  target="_blank" rel="nofollow">Cookie
                                                Policy</a>. You may receive SMS notifications from us and can
                                                opt out at any time.</p>
                                        </div>

                                    </div>

                                    <div className="text-center ">

                                        <button type="submit" className="btn btn-success btn-md mt-3">Create New
                                            Account
                                        </button>
                                    </div>
                                    <div className="text-center p-md-2">

                                        <a href="#">Already Have Account</a>
                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </>


}

export default Register;