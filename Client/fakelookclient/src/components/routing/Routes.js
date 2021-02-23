import React, { Component } from "react";
import Home from "../homeComponents/home";
import Login from "../loginComponents/login";
import MapContainer from "../mapComponents/GoogleMapsContainer";
import AboutUs from "../aboutUsComponents/aboutUs";
import { Switch, Route } from "react-router-dom";

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/map" component={MapContainer} />
          <Route exact path="/aboutus" component={AboutUs} />
        </Switch>
      </div>
    );
  }
}
