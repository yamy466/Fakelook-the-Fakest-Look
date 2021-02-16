import React, { Component } from "react";
import Home from "../components/homeComponents/home";
import History from "../History/history";

export default class Routes extends Component {
  render() {
    return (
      <Router history={History}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}
