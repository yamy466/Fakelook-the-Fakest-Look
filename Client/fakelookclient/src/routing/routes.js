import React, { Component } from "react";
import Home from "../components/homeComponents/home";
import Login from "../components/loginComponents/login";
import AboutUs from "../components/aboutUsComponents/aboutUs";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import History from "../History/history";

export default class Routes extends Component {
  render() {
    return (
      <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/aboutus" component={AboutUs} />
          </Switch>
      </div>
    );
  }
}
