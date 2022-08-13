import './App.css'
import { BrowserRouter as Router, Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from './components/Home/Home';
import SearchResults from './components/Home/SearchResults';
import Friends_List from './components/Home/Friends_List';
import FriendRequests from './components/Home/FriendRequests';
import Profile from './components/Profile/Profile';
import HomeChat from './components/chat/Index';
import Detail from './components/chat/Detail';
import Sugustions_List from './components/Home/Sugustions_List';
import Groups from './components/groups/Groups';
import Post2 from './components/Home/Post2';
import GroupPeople from './components/groups/GroupPeople';
import GroupsHome from './components/groups/GroupsHome';
import HeaderCheck from './components/Header/HeaderCheck';
import React from 'react';

function App() {
  return (
    <Router>
      <div className='app'>
        <BrowserRouter> 
        <HeaderCheck/> 
          <Switch>
            <Route exact path={"/auth/register"} component={Register} />
            <Route exact path={"/auth/login"} component={Login} />
            <Route exact path={"/home/Home/"} component={Home} />
            <Route exact path={"/home/search"} component={SearchResults} />
            <Route exact path={"/home/friendRequests/"} component={FriendRequests} />
            <Route exact path={"/home/Friends_list/"} component={Friends_List} />
            <Route exact path={"/home/pro/:id/"} component={Profile} />
            <Route exact path={"/chats/"} component={HomeChat} />
            <Route exact path={"/chats/detail/:id/"} component={Detail} />
            <Route exact path={"/home/search/:name"} component={SearchResults} />
            <Route exact path={"/home/sugistions_list/"} component={Sugustions_List} />
            <Route exact path={"/home/group/:id/"} component={Groups} />
            <Route exact path={"/home/group/people/:id/"} component={GroupPeople} />
            <Route exact path={"/home/Post/:post_id/"} component={Post2} />
            <Route exact path={"/home/groups"} component={GroupsHome} />
          </Switch>
        </BrowserRouter>
      </div>
    </Router>
  );
}

export default App;
