import {
  Accordion,
  AccordionContent,
  AccordionTitle,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Grid,
  GridColumn,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import env from "../../enviroments/enviroment";
import logo from "../../logo/logo_transparent.png";
import { connect } from "react-redux";
import { addLike } from "../../actions/postsActions";
import Like from "../like/like";
import Comments from "../comments/comments";
import { useState } from "react";

const Post = props => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const { post, userId } = props;
  const { publisher, text, photoURL, postedTime, tags, taggedUsers } = post;
  return (
    <Card>
      <Image src={photoURL || logo} />
      <CardContent>
        <Grid columns={2}>
          <GridColumn width={13}>
            <CardHeader as="h4">{text}</CardHeader>
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
            <CardDescription>by {publisher}</CardDescription>
            <CardDescription>
              {taggedUsers && taggedUsers.length > 0 ? `with ${taggedUsers.join(", ")}` : ""}
            </CardDescription>
          </GridColumn>
          <GridColumn width={3}>
            <Label ribbon="right">
              <Like item={post} userId={userId} type="post" />
            </Label>
          </GridColumn>
        </Grid>
      </CardContent>
      <CardContent extra>
        <Accordion>
          <AccordionTitle
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            active={isCommentsOpen}
          >
            <Icon name="comment" style={{ color: env.mainColor }} />
            Comments
          </AccordionTitle>
          <AccordionContent active={isCommentsOpen}>
            <Comments post={post}/>
          </AccordionContent>
        </Accordion>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = ({ posts, login }) => {
  return {
    posts,
    userId: login.userId,
  };
};

export default connect(mapStateToProps, { addLike })(Post);
