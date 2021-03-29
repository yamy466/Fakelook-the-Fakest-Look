import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions/postsActions";
import { Segment, Sidebar, SidebarPusher } from "semantic-ui-react";
import Post from "../post/post.jsx";
import UserMenu from "../userMenu/userMenu";
import "./feed.css";

const Feed = props => {
  useEffect(() => {
    props.fetchPosts();
  }, []);

  const renderPosts = () => {
    return props.posts
      ?.sort((a, b) => (a.postedTime > b.postedTime ? -1 : 1))
      .map(post => {
        return (
          <div>
            <Post post={post} />
            <br />
          </div>
        );
      });
  };

  return (
    <div>
      <Sidebar.Pushable as={Segment}>
        <UserMenu
          visible={true}
          showClose={false}
          setVisible={() => alert("Can not close the window here")}
        />
        <SidebarPusher>
          <div className="Centered">{renderPosts()}</div>
        </SidebarPusher>
      </Sidebar.Pushable>
    </div>
  );
};

const mapStateToProps = ({ posts }) => {
  return {
    posts,
  };
};

export default connect(mapStateToProps, { fetchPosts })(Feed);
