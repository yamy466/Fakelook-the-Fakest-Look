import { Component } from "react";
import Home from "../homeComponents/home";
import AboutUs from "../aboutUsComponents/aboutUs";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import MapFeed from "../mapFeed/mapFeed";
import Feed from "../feed/postsFeed";

class Routes extends Component {
  render() {
    return (
      <Switch>
        {this.props.username && (
          <>
            <Route exact path="/map" component={MapFeed} />
            <Route exact path="/feed" component={Feed} />
          </>
        )}
        <Route exact path="/aboutus" component={AboutUs} />
        <Route path="/" component={Home} />
      </Switch>
    );
  }
}

const mapStateToProps = ({ login }) => {
  return {
    username: login.username,
  };
};

export default connect(mapStateToProps)(Routes);
