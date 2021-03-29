import { Card, Image } from "semantic-ui-react";
import logo from "../../logo/logo_transparent.png";
import PostComments from "./postComments";
import PostContent from "./postContent";

const Post = ({ post }) => {
  return (
    <Card>
      <Image src={post.photoURL || logo} />
      <PostContent post={post} />
      <PostComments post={post} />
    </Card>
  );
};

export default Post;
