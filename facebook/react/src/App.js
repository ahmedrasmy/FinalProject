import './App.css';
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Home from './Home/Home'

function App() {
    return (
        <div className="App">
            <BrowserRouter>

                <Switch>

                    <Route exact path={"/chats/register"} component={Register}/>
                    <Route exact path={"/chats/login"} component={Login}/>
                    <Route exact path={"/chats/home"} component={Home}/>

                </Switch>
            </BrowserRouter>

        </div>
    );
}

export default App;
