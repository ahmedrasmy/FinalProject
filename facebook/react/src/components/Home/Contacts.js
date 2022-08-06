import React from 'react';
import '../css/Contacts.css';
import { useEffect, useState } from "react";
import axios from "axios";
function Contacts() {
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/friends_list_contacts/')
            .then(res => {
                setContacts(res.data);
            })
            .catch((err) => console.log(err))
    }, [])
    return (<div className="contacts">
        <div className="head">
            <h3>Contacts</h3>
            <div className="icons">
                <a href="#"> <i class="fa-solid fa-video"></i></a>
                <a href="#"> <i class="fa-solid fa-magnifying-glass"></i></a>
                <a href="#"> <i class="fa-solid fa-ellipsis"></i></a>
            </div>
        </div>
        {
            contacts.map((contact) => {
                return <>
                    <a href={"/chats/detail/" + contact.id}>
                        {contact['isactive'] === true ?


                            <span className="more-hover image" >
                                <img src={contact.pic} />
                                <span >{contact.first_name + " " + contact.last_name} </span>
                            </span> :
                            <span className="more-hover images">
                                <img src={contact.pic} />
                                <span >{contact.first_name + " " + contact.last_name} </span>
                            </span>

                        }

                    </a>
                </>
            }
            )
        }
    </div>
    )
}
export default Contacts