import logo from './logo.svg';
import './App.css'
import { BrowserRouter as Router, Route,BrowserRouter,Switch } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Header from './components/Home/Header';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from './components/Home/Home';
import Profilee from './components/Profile/Profile'
import 'bootstrap/dist/css/bootstrap.css';
import SearchResults from './components/Home/SearchResults';
import Account from './components/Home/Account'
function App() {
  return (
    <Router>

      <div className='app'>

             <BrowserRouter>
            <Switch>


                    <Route exact path={"/chats/register"} component={Register}/>
                    <Route exact path={"/chats/login"} component={Login}/>
                    <Route exact path={"/chats/Home/"} component={Home}/>
                    <Route exact path={"/chats/profile/"} component={Profilee}/>
                    <Route exact path={"/home/search"} component={SearchResults}/>
                    <Route exact path={"/home/account/:id/:pk"} component={Account}/>

</Switch>
            </BrowserRouter>
      </div>
    </Router>
  );
}

export default App;
