import React from 'react';
import '../css/Home.css';
import Feed from './Feed';
import Header from './Header';
import Sidebar from './Sidebar';
import Contacts from './Contacts';
import {useLocation} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";

function Home() {
    const [users, setUsers] = useState({})
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get/')
            .then(res => {
                setUsers(res.data[0]);
            })
            .catch((err) => console.log(err))
    }, [])
    // console.log(users[0].first_name)
    return (

        <div className="home">
            <Header name={users.first_name+' '+users.last_name} image={users.pic}/>
            <div className="home_body">
                <Sidebar/>
                <Feed/>
                <Contacts/>
            </div>
        </div>
    );
}

export default Home;
