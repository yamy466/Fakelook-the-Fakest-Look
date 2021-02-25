import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
          <Link className="ui primary button" to="/map">
            Move to Map
          </Link>
      </div>
    );
  }
}

export default Home;
