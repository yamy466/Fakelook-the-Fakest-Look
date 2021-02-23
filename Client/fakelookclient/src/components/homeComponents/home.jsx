import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navigation from "../navigationComponents/navigation";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div>
          <Navigation />
        </div>
        <br />
        <div>
          <Link className="ui primary button" to="/login">
            Move to Login
          </Link>
          <Link className="ui primary button" to="/map">
            Move to Map
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
