import { Marker, Popup } from "react-leaflet";
import React, { Component } from "react";
import PostsService from "../../services/postsService";
import customIcon from "./CustomIcon";
import AboutUs from "../aboutUsComponents/aboutUs";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions/index";

class ShowPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    props.fetchPosts();
    this.initPosts();
  }

  initPosts = () => {
    this.props.posts?.data?.map((res) => {
      this.setState({ posts: res });
    });
  };

  createLocation = (location) => {
    return { lat: location.x, lon: location.y };
  };

  renderLocations = () => {
    console.log(this.props.posts, "current posts");
    return this.props.posts.map((post) => {
      return (
        <Marker
          key={post.id}
          icon={customIcon()}
          position={this.createLocation(post.location)}>
          <Popup>
            <AboutUs />
          </Popup>
        </Marker>
      );
    });
  };

  render() {
    return this.renderLocations();
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

export default connect(mapStateToProps, { fetchPosts })(ShowPosts);
