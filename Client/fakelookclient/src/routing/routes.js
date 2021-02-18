import React, { Component } from "react";
import Home from "../components/homeComponents/home";
import Login from "../components/loginComponents/login";
import AboutUs from "../components/aboutUsComponents/aboutUs";
import { Router, Switch, Route } from "react-router-dom";
import History from "../History/history";

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Router history={History}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/aboutus" component={AboutUs} />
          </Switch>
        </Router>
      </div>
    );
  }
}
