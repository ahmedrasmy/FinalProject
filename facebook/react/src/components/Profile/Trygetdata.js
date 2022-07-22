import React,{ Component} from 'react'
import axios from 'axios';
import { useContext, useEffect, useState } from "react";

function Trygetdata() {
    const [users, setUsers] = useState([])
    useEffect( () => {
        axios.get('http://127.0.0.1:8000/api/get/')
        .then(res =>{
            setUsers(res.data);
            console.log(res.data);
        })
        .catch((err)=> console.log(err))
    }, [])
    return (
        <div>trygetdata</div>
    )
}

export default Trygetdata