import '../css/SearchResults.css';
import axios from 'axios';
import {useEffect, useState} from "react";
import CSRF from "../Auth/CSRF";
import Header from "../Header/Header";
import Sidebar from "./Sidebar";
import {Avatar, IconButton} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import {useLocation} from "react-router-dom";



function SearchResults() {
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
    return (
        <>
            <Header/>
            <div className="home_body">
                <Sidebar/>

                {users ?
                    <div className="all_posts"
                        style={{width: "1000px", height: "auto", marginRight: "250px"}}>
                        <header style={{fontWeight: "bold", marginLeft: "20px", marginTop: "20px"}}> People</header>

                        {

                            users.map((account, index) => {
                                return <>

                                    <div className="Top_section">
                                        <Avatar src={account['pic']} className="Posts_avatar"/>
                                        {account['user_name']}
                                        <br/>

                                        {account['email']}
                                        <div style={{marginLeft: "500px"}}></div>
                                        {
                                            account['is_self'] ? <div>Ana</div> : <div>
                                                {
                                                    account['is_friend'] === true ? 
                                                        <button>
                                                            <IconButton>
                                                                <ForumIcon/>
                                                            </IconButton>
                                                        </button> :
                                                        <>
                                                            {account['request_sent'] === 1 ?
                                                                <div className="d-flex flex-column align-items-center">
                                                                    <form action={'/home/cancel_friend_request/'}
                                                                        method="post">
                                                                        <CSRF/>
                                                                        <input type="hidden" name="cancel_request"
                                                                            value={account['id']}/>
                                                                        <button type="submit"
                                                                                className="btn btn-danger">
                                                                            Cancel Friend Request
                                                                        </button>
                                                                    </form>
                                                                </div>
                                                                : null}

                                                            {account['request_sent'] === -1 ?
                                                                <div className="d-flex flex-column align-items-center">
                                                                    <form action={'/home/send_friend_request/'}
                                                                        method="post">
                                                                        <CSRF/>
                                                                        <input type="hidden" name="send_friend_request"
                                                                            value={account['id']}/>
                                                                        <button type="submit"
                                                                                className="btn btn-primary">
                                                                            Send Friend Request
                                                                        </button>
                                                                    </form>
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