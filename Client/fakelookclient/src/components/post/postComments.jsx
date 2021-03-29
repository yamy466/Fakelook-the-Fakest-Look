import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionTitle,
  CardContent,
  Icon,
  Segment,
} from "semantic-ui-react";
import env from "../../enviroments/enviroment";
import CommentCreate from "../comments/commentCreate";
import Comments from "../comments/comments";
import { connect } from "react-redux";
import { addComment, getPostComments } from "../../services/postsService";

const PostComments = ({ post }) => {
  const [commentsStatus, setCommentsStatus] = useState("");
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const onAddComment = async text => {
    const res = await addComment({ text, postId: post.id });
    setComments([res.data, ...comments]);
  };

  const onOpenComments = async () => {
    setIsCommentsOpen(!isCommentsOpen);
    if (isCommentsOpen === false) {
      try {
        setCommentsStatus("loading");
        const res = await getPostComments(post.id);
        setComments(res.data);
        setCommentsStatus("");
      } catch (error) {
        alert("there was a problem recieve the comments. try again later");
      }
    }
  };

  return (
    <CardContent extra>
      <Accordion>
        <AccordionTitle onClick={onOpenComments} active={isCommentsOpen}>
          <Icon name="dropdown" style={{ color: env.mainColor }} />
          Comments
        </AccordionTitle>
        <AccordionContent active={isCommentsOpen} style={{ maxHeight: 200, overflowY: "scroll" }}>
          <Segment loading={commentsStatus === "loading"}>
            <CommentCreate onAddComment={onAddComment} />
            <br />
            <Comments comments={comments} />
          </Segment>
        </AccordionContent>
      </Accordion>
    </CardContent>
  );
};

const mapStateToProps = ({ login }) => ({ username: login.username });

export default connect(mapStateToProps)(PostComments);
