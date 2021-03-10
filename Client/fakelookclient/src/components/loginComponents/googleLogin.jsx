import React, { Component } from "react";

class GoogleLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { isSignedIn: null };
  }
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: 111,
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        });
    });
  }
  render() {
    return <div>google</div>;
  }
}

export default GoogleLogin;
