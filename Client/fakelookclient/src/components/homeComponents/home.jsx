import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <input type="button" class="ui primary button" value="hello" />
      </div>
    );
  }
}

export default Home;
