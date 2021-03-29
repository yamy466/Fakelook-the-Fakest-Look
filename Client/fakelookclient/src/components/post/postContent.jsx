import {
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Grid,
  GridColumn,
  Label,
} from "semantic-ui-react";
import { connect } from "react-redux";
import env from "../../enviroments/enviroment";
import Like from "../like/Like";
import FormattedDate from "../formattedDate/formattedDate";

const PostContent = ({ post, userId }) => {
  const { publisher, text, postedTime, tags, taggedUsers } = post;

  return (
    <CardContent>
      <Grid columns={2}>
        <GridColumn width={13}>
          <CardHeader as="h4">{text}</CardHeader>
          <CardMeta>
            <FormattedDate date={postedTime} format="DD/MM/YYYY HH:mm" />
          </CardMeta>
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
            <Like item={post} type="post" />
          </Label>
        </GridColumn>
      </Grid>
    </CardContent>
  );
};

const mapStateToProps = ({ login }) => {
  return {
    userId: login.userId,
  };
};

export default connect(mapStateToProps)(PostContent);
