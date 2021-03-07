import React, { Component } from "react";

class GoogleLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    window.gapi.load("client:auth2");
  }
  render() {
    return <div>google</div>;
  }
}

export default GoogleLogin;
