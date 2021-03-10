import { Component } from "react";
import Home from "../homeComponents/home";
import AboutUs from "../aboutUsComponents/aboutUs";
import { Switch, Route } from "react-router-dom";
import MapFeed from "../mapFeed/mapFeed";
import { connect } from "react-redux";

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/aboutus" component={AboutUs} />
          {this.props.accessToken && (
            <Route exact path="/map" component={MapFeed} />
          )}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({  login }) => {
  return {
    accessToken : login.accessToken,
  };
};

export default connect(mapStateToProps)(Routes);
