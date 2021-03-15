import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Image,
} from "semantic-ui-react";
import env from "../../enviroments/enviroment";
import logo from "../../logo/logo_transparent.png";

const Post = ({ post }) => {
  const { publisher, text, photoURL, postedTime, tags, likes, taggedUsers } = post;
  return (
    <Card>
      <Image src={photoURL || logo} />
      <CardContent>
        <CardHeader>{text}</CardHeader>
        <CardMeta>{new Date(postedTime).toLocaleDateString("en-UK")}</CardMeta>
        <CardDescription>
          {tags.map(t => {
            return (
              <span>
                #<span style={{ color: env.mainColor }}>{t} </span>
              </span>
            );
          })}
        </CardDescription>
        {console.log(post)}
        <CardDescription>by {publisher}</CardDescription>
        <CardDescription>
          {taggedUsers && taggedUsers.length > 0 ? `with ${taggedUsers.join(", ")}` : ""}
        </CardDescription>
      </CardContent>
      <CardContent extra>
        <Button>
          <i class="fas fa-thumbs-up" style={{ color: env.mainColorDark }}></i>
        </Button>
        {likes ? likes.length : 0}
      </CardContent>
    </Card>
  );
};

export default Post;
