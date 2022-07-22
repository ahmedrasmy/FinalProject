import React from 'react'
import Story from './Story';
import '../css/StoryReel.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function StoryReel() {
    return (
        <div className="storyReel">
            <div class="story create-story">
            <img src="https://images.pexels.com/photos/12389754/pexels-photo-12389754.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200" alt="" />
            <div class="icon">
                <AddCircleOutlineIcon/>
            </div>
            <h4>Create Story</h4>
            </div>
            <Story image="https://images.pexels.com/photos/12389754/pexels-photo-12389754.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200" profilSrc="https://images.pexels.com/photos/12461880/pexels-photo-12461880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" title="som3a"/>
            <Story profilSrc="https://images.pexels.com/photos/12389754/pexels-photo-12389754.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200" image="https://images.pexels.com/photos/12461880/pexels-photo-12461880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" title="Elias"/>
            <Story image="https://images.pexels.com/photos/12389754/pexels-photo-12389754.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200" profilSrc="https://images.pexels.com/photos/12461880/pexels-photo-12461880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" title="som3a"/>
            <Story profilSrc="https://images.pexels.com/photos/12389754/pexels-photo-12389754.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200" image="https://images.pexels.com/photos/12461880/pexels-photo-12461880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" title="SuperMaicon"/>
        </div>
    )
}

export default StoryReel