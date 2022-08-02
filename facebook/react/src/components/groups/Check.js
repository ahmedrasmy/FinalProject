import React, { useState } from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from "axios";
import { Avatar, IconButton } from '@mui/material';


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function Check({ user_id, group_id, reciver_id, name, pic }) {
    const [invited, setinvited] = useState(false)
    const invite = () => {
        const dataInvite = {
            user: parseInt(user_id),
            body: "invite u to join group ",
            Invit_receiver: parseInt(reciver_id),
            group: parseInt(group_id),
        }
        axios.post("http://127.0.0.1:8000/api/invite/",
            dataInvite, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        },
        ).then(res => { setinvited(true) }).catch((err) => console.log(err))
    }
    return (
        <div style={{ display: "flex", flexWrap: "wrap", borderBottom: "0.5px solid gray", marginTop: "20px" }}>
            <Avatar src={pic} style={{ marginLeft: "20px", marginRight: "20px" }} />
            <div style={{ marginTop: "8px", marginLeft: "20px", marginRight: "40px" }}>{name}</div>
            {
                invited === true ?
                    <>
                        <p style={{ color: "blue" }}>invited</p>
                    </>
                    :
                    <IconButton style={{ color: "blue" }} onClick={invite} ><PersonAddIcon />invite</IconButton>
            }
        </div>
    )
}

export default Check