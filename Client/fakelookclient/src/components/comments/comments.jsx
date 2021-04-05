import { CardGroup } from "semantic-ui-react";
import MyComment from "./comment";

const Comments = ({ comments }) => {
  return (
    <CardGroup>
      {comments &&
        comments.length > 0 &&
        comments
          .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
          .map(c => <MyComment key={c.id} comment={c} />)}
    </CardGroup>
  );
};

export default Comments;
