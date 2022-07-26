import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import axios from "axios";
import jQuery from "jquery";
import {useState} from "react";

function Search() {


    const Input = () => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                console.log('do validate')
            }
        }


    }


    return (

     <input type="text" onKeyDown={Input}/>

)
}


export default Search