import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Image,
} from "semantic-ui-react";
import env from "../../enviroments/enviroment";
import logo from "../../logo/logo_transparent.png";
import { connect } from "react-redux";
import { addLike } from "../../actions";

const Post = props => {
  const {post,userId} = props;
  const { publisher, text, photoURL, postedTime, tags, likes, taggedUsers } = post;
  const alreadyLiked = likes?.includes(userId)
  return (
    <Card>
      <Image src={photoURL || logo} />
      <CardContent>
        <CardHeader>{text}</CardHeader>
        <CardMeta>{new Date(postedTime).toLocaleDateString("en-UK")}</CardMeta>
        <CardDescription>
          {tags.map((t) => {
            return (
              <span>
                #<span style={{ color: env.mainColor }}>{t} </span>
              </span>
            );
          })}
        </CardDescription>
        <CardDescription>by {publisher}</CardDescription>
        <CardDescription>
          {taggedUsers && taggedUsers.length > 0 ? `with ${taggedUsers.join(", ")}` : ""}
        </CardDescription>
      </CardContent>
      <CardContent extra>
        <i
          className={`${alreadyLiked ? "fas" : "far"} fa-thumbs-up`}
          onClick={() => alreadyLiked ? null : props.addLike(post.id)}
          style={{ cursor: `${alreadyLiked ? "" : "pointer"}`, color: env.mainColorDark, fontSize: 20 }}
        ></i>

        {likes ? likes.length : 0}
      </CardContent>
    </Card>
  );
};

const mapStateToProps = ({ posts,login }) => {
  return {
    posts,
    userId: login.userId
  };
};

export default connect(mapStateToProps, { addLike })(Post);
