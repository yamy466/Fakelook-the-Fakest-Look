import React, { Component } from "react";
import Home from "../homeComponents/home";
import Login from "../loginComponents/login";
import FakeLookMap from "../mapComponents/map.jsx";
import AboutUs from "../aboutUsComponents/aboutUs";
import { Switch, Route } from "react-router-dom";

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/map" component={FakeLookMap} />
          <Route exact path="/aboutus" component={AboutUs} />
        </Switch>
      </div>
    );
  }
}
