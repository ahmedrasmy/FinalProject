import React from 'react';
import AllPosts from './AllPosts';
import '../css/Feed.css';
import Post from './Post';
import StoryReel from './StoryReel';
function Feed() {
    return (
        <div className="feed">
            <StoryReel/>
            <Post/>
            <AllPosts profilePic="https://images.deliveryhero.io/image/talabat/restaurants/Logo_637462257288960565.jpg?width=180"
            message="hellooo this me"
            timestamp="this atime stamp"
            username="som3a"
            image="https://images.pexels.com/photos/12025241/pexels-photo-12025241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <AllPosts profilePic="https://images.deliveryhero.io/image/talabat/restaurants/Logo_637462257288960565.jpg?width=180"
            message="hellooo this me"
            timestamp="this atime stamp"
            username="som3a"
            />
        </div>
    )
}

export default Feed