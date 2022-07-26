import React from 'react'
import '../css/Story.css';
import { IconButton,Avatar } from '@mui/material';
function Story({image,profilSrc,title}) {
    return (
        <>
        <div style={{ backgroundImage: 'url('+image+')'}} className="story">
            <Avatar className="story_avatar" src={profilSrc}/>
            <h4>{title}</h4>
        </div>
         <script>
            $(document).ready(function(){
            $('.story').owlCarousel({
                center: false,
                items:3,
                loop:true,
                margin:5,
                stagePadding: 15,
            })
            })
            </script>
        </>
    )   
}
export default Story