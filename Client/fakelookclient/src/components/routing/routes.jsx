import React, { Component } from "react";
import Home from "../homeComponents/home";
import AboutUs from "../aboutUsComponents/aboutUs";
import { Switch, Route } from "react-router-dom";
import MapFeed from "../mapFeed/mapFeed";

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/map" component={MapFeed} />
          <Route exact path="/aboutus" component={AboutUs} />
        </Switch>
      </div>
    );
  }
}
