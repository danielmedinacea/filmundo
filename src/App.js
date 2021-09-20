import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/login/Login";
import Menu from "./components/menu/Menu";
import Submenu from "./components/submenu/Submenu";
import Main from "./components/main/Main";
import Film from "./components/film/Film";
import Filmlist from "./components/filmlist/Filmlist";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/main" exact>
          <Menu />
          <Submenu />
          <Main />
        </Route>
        <Route path="/film/:id" exact>
          <Menu />
          <Film />
        </Route>
        <Route path="/filmlist" exact>
          <Menu />
          <Filmlist />
        </Route>
        <Redirect to="/main" />
      </Switch>
    </Router>
  );
}

export default App;
