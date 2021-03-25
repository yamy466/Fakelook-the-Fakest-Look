import { Marker, Popup } from "react-leaflet";
import React, { Component } from "react";
import customIcon from "./CustomIcon";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions/postsActions";
import Post from "../post/post";

class ShowPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
      props.fetchPosts();
  }

  createLocation = (location) => {
    return { lat: location.x, lon: location.y };
  };

  renderLocations = () => {
    return this.props.posts?.map((post) => {
      return (
        <Marker
          key={post.id}
          icon={customIcon(post.photoURL)}
          position={this.createLocation(post.location)}
        >
          <Popup>
            <Post post={post} />
          </Popup>
        </Marker>
      );
    });
  };

  render() {
    return this.renderLocations();
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    posts,
  };
};

export default connect(mapStateToProps, { fetchPosts })(ShowPosts);
