import logo from './logo.svg';
import './App.css';
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>

                <Switch>

                    <Route exact path={"/chats/register"} component={Register}/>
                    <Route exact path={"/chats/login"} component={Login}/>


                </Switch>
            </BrowserRouter>

        </div>
    );
}

export default App;
