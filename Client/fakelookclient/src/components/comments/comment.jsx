import { Card, CardContent, CardDescription, CardHeader, CardMeta } from "semantic-ui-react";
import FormattedDate from "../formattedDate/formattedDate";
import Like from "../like/Like";
const MyComment = ({ comment }) => {
  const { text, writer, createdAt } = comment;
  return (
    <Card raised>
      <CardContent>
        <CardHeader>{writer}</CardHeader>
        <CardMeta>
          <FormattedDate date={createdAt} format="DD/MM/YYYY HH:mm" />
        </CardMeta>
        <CardDescription>{text}</CardDescription>
      </CardContent>
      <CardContent extra>
        <Like item={comment} type="comment" />
      </CardContent>
    </Card>
  );
};

export default MyComment;
