import '../css/SearchResults.css';
import axios from 'axios';
import { useEffect, useState } from "react";
import CSRF from "../Auth/CSRF";
import Header from "../Header/Header";
import Sidebar from "../Home/Sidebar";
import { Avatar, IconButton } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import { useLocation } from "react-router-dom";

function GroupPeople() {
    let location = useLocation();
    let id = location.pathname.split('/')[4]
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get_all_users_group/' + id)
            .then(res => {
                setUsers(res.data);
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }, [id])
    return (
        <>
            <Header />
            <div className="home_body">
                <Sidebar />
                {users ?
                    <div className="all_posts"
                        style={{ width: "1000px", height: "auto", marginRight: "250px" }}>
                        <header style={{ fontWeight: "bold", marginLeft: "20px", marginTop: "20px" }}> People</header>
                        {
                            users.map((account, index) => {
                                return <>
                                    <div className="Top_section">
                                        <Avatar src={account.pic} className="Posts_avatar" />
                                        {account.first_name + " " + account.last_name}
                                        <br />
                                        {account.email}
                                        <div style={{ marginLeft: "500px" }}></div>
                                        <div><a href={'/home/pro/' + account.id}> see profile </a></div>
                                    </div>
                                    <hr style={{ color: "gray" }} />
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

export default GroupPeople