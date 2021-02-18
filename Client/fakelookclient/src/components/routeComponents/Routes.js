import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../homeComponents/home";
import Login from "../loginComponents/login";
import AboutUs from "../aboutUsComponents/aboutUs";
import History from "../../History/history";

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
