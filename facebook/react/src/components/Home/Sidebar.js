import React from 'react';
import '../css/Sidebar.css';
import SidebarRow from './SidebarRow';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

function Sidebar() {
    return (
        <>
            <div className="sidebar">
                <a href="/home/groups" style={{ textDecoration: 'none' }}><SidebarRow Icon={GroupsIcon} title="Groups" /></a>
                <SidebarRow Icon={EmojiFlagsIcon} title="Pages" />
                <SidebarRow title="Friends" Icon={PeopleIcon} />
                <SidebarRow Icon={StarIcon} title="Favorites" style={{ color: "yellow !important" }} />
                <SidebarRow title="Messenger" Icon={ChatIcon} />
                <SidebarRow title="Marketplace" Icon={StorefrontIcon} />
                <SidebarRow title="videos" Icon={VideoLibraryIcon} />
                <SidebarRow title="Events" Icon={LocalActivityIcon} />
                <SidebarRow title="See more" Icon={ExpandMoreIcon} />
            </div>
        </>
    )
}

export default Sidebar