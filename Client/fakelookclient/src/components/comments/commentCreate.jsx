import { useState } from "react";
import { Form, FormButton, FormInput, TextArea } from "semantic-ui-react";

const CommentCreate = ({ onAddComment }) => {
  const [commentText, setCommentText] = useState("");

  const onAddClick = e => {
    e.preventDefault();
    onAddComment(commentText);
  };

  return (
    <Form>
      <FormInput
        as={TextArea}
        style={{ resize: "none" }}
        value={commentText}
        onChange={({ target }) => setCommentText(target.value)}
      />
      <FormButton icon="edit" onClick={onAddClick} labelPosition content="add comment" />
    </Form>
  );
};

export default CommentCreate;
