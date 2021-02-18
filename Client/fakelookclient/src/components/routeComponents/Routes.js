import React, { Component } from "react";
import Home from "../components/homeComponents/home";
import Login from "../components/loginComponents/login";
import AboutUs from "../components/aboutUsComponents/aboutUs";
import { Switch, Route } from "react-router-dom";

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
