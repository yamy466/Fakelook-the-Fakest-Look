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
          clientId:
            658500331512 -
            b8brj0s76i3mpopna77q75vpjodbe1c6.apps.googleusercontent.com,
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
