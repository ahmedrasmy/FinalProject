import React from 'react'
import {useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from './Header';

function HeaderCheck() {
    let location = useLocation();
    let  checkheader= location.pathname.split('/')[1]
    const [checkheaderu,setcheckheaderu]=useState(false)
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/checkheader/')
            .then(res => {
                setcheckheaderu(res.data[0]);
            })
            .catch((err) => console.log(err))
    }, [checkheader])
    return (
        <>
        {
            checkheader !== "auth"  && checkheaderu === true ?
            <Header/>
            : <></>
        }
    </>
    )
}

export default HeaderCheck