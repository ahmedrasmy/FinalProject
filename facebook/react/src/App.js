import './App.css';
import { BrowserRouter as Router, Route,BrowserRouter,Switch } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Header from './components/Home/Header';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from './components/Home/Home';
import Profilee from './components/Profile/Profile';
import SearchResults from './components/Home/SearchResults';
import Account from './components/Home/Account'
import Friends_List from './components/Home/Friends_List';
import FriendRequests from './components/Home/FriendRequests';

function App() {
  return (
    <Router>
      <div className='app'>
            <BrowserRouter>
            <Switch>
                    <Route exact path={"/chats/register"} component={Register}/>
                    <Route exact path={"/chats/login"} component={Login}/>
                    <Route exact path={"/home/Home"} component={Home}/>
                    <Route exact path={"/home/profile"} component={Profilee}/>
                    <Route exact path={"/home/search"} component={SearchResults}/>
                    <Route exact path={"/home/account/:id"} component={Account}/>
                    <Route exact path={"/home/friendRequests/"} component={FriendRequests}/>
                    <Route exact path={"/home/Friends_list/"} component={Friends_List}/>
            </Switch>
            </BrowserRouter>
      </div>
    </Router>
  );
}

export default App;
