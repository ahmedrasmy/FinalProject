import '../css/SearchResults.css';
import i1 from '../images/i1.jpg';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { useContext, useEffect, useState } from "react";

function SearchResults() {
    const [freind,setfreind] = useState(true)
    const [users, setUsers] = useState([])
    useEffect( () => {
        axios.get('http://127.0.0.1:8000/api/get/')
        .then(res =>{
            setUsers(res.data);
            console.log(res.data);
        })
        .catch((err)=> console.log(err))
    }, [])
    const createOrReturnPrivateChat=(e)=>{}
    return (
        <>
            <div className="container">
                <div className="card p-2">
                    { users ? 
                        <div className="d-flex flex-row flex-wrap">
                        {
                            users.map ((account,index) => {
                                return <>
                                    <div className="card flex-row flex-grow-1 p-2 mx-2 my-2 align-items-center col-4">
                                        <a className="profile-link" href="#">
                                            <div className="card-image m-2">
                                                <img className="img-fluid profile-image" src={account.pic} alt=""/>
                                            </div>
                                        </a>
                                        {/*% url 'account:view' user_id=account.0.id %*/}
                                        <a className="profile-link" href="#">
                                            <div className="card-center px-2">
                                                <h4 className="card-title">{account.first_name}</h4>
                                                {/* if account.1  Here we check if this one is afrirnd 
                                                onclick="createOrReturnPrivateChat('{{account.0.id}}')*/}
                                                {
                                                    freind ? <p className="card-text"><a href="#" onClick={(e) => createOrReturnPrivateChat(account.id)}> Send a Message</a></p>
                                                    : null
                                                }    
                                            </div>
                                        </a>
                                        <div className="d-flex flex-row card-right flex-grow-1 justify-content-end mx-2">
                                            { freind ? 
                                                <div className="d-flex flex-row friends-text-container p-3">
                                                    <p className="friends-text m-auto">
                                                        Friends 
                                                    </p>
                                                    <span className="material-icons checkmark-icon m-auto pl-2">
                                                    <CheckCircleIcon/>
                                                    </span>
                                                    {/*this after the next :  && request.user here we check it's it's Not me who log in  {% if account.0 !=  request.user %} */}
                                                </div>
                                            : !freind  ?  
                                                    <div className="d-flex flex-row friends-text-container p-3">
                                                        <p className="friends-text m-auto">
                                                            Not Friends 
                                                        </p>
                                                        <span className="material-icons cancel-icon m-auto pl-2"><CancelIcon /></span>
                                                    </div>
                                            :
                                                <div className="d-flex flex-row friends-text-container p-3">
                                                    <p className="friends-text m-auto">
                                                        This is you 
                                                    </p>
                                                    <span className="material-icons m-auto pl-2">
                                                    person_pin
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                        </div>
                                    </>
                                })
                        }
                        </div>
                            :  <div className="d-flex flex-row flex-grow-1 justify-content-center align-items-center p-4">
                                <p>No results</p>
                            </div>
                    }
                    </div>
                </div>
        </>
    )
}

export default SearchResults