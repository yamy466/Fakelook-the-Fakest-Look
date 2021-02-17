import React, { Component } from "react";
import Home from "../components/homeComponents/home";
import History from "../History/history";
import {
  BrowserRouter as Router,
  MemoryRouter,
  Switch,
  Route,
} from "react-router-dom";

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Router history={History}>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
        <MemoryRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
          </Switch>
        </MemoryRouter>
      </div>
    );
  }
}
