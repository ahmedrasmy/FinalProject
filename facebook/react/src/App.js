import './App.css'
import {BrowserRouter as Router, Route, BrowserRouter, Switch} from 'react-router-dom';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from './components/Home/Home';
import SearchResults from './components/Home/SearchResults';
import Friends_List from './components/Home/Friends_List';
import FriendRequests from './components/Home/FriendRequests';
import Profile from './components/Profile/Profile';
import HomeChat from './components/chat/Index';
import Detail from './components/chat/Detail';
function App() {
    return (
        <Router>
      <div className='app'>
            <BrowserRouter>
              <Switch>
                <Route exact path={"/auth/register"} component={Register}/>
                <Route exact path={"/auth/login"} component={Login}/>
                <Route exact path={"/home/Home/"} component={Home}/>
                <Route exact path={"/home/search"} component={SearchResults}/>
                <Route exact path={"/home/friendRequests/"} component={FriendRequests}/>
                <Route exact path={"/home/Friends_list/"} component={Friends_List}/>
                <Route exact path={"/home/pro/:id/"} component={Profile}/>
                <Route exact path={"/chats/"} component={HomeChat}/>
                <Route exact path={"/chats/detail/:id/"} component={Detail}/>
                <Route exact path={"/home/search/:name"} component={SearchResults}/>
              </Switch>
            </BrowserRouter>
      </div>
    </Router>
  );
}

export default App;
