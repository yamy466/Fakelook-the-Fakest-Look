import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions";
import { Segment, Sidebar, SidebarPusher } from "semantic-ui-react";
import Post from "../post/post";
import UserMenu from "../userMenu/userMenu";
import "./feed.css";

class Feed extends Component {
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

  renderPosts = () => {
    return this.props.posts?.reverse().map((post) => {
      return (
        <div>
          <Post post={post} />
          <br />
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <UserMenu
            visible={true}
            showClose={false}
            setVisible={() => alert("Can not close the window here")}
          />
          <SidebarPusher>
            <div className="Centered">{this.renderPosts()}</div>
          </SidebarPusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    posts,
  };
};

export default connect(mapStateToProps, { fetchPosts })(Feed);
