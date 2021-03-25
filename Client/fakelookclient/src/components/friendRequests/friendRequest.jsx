import { Button, Card } from "semantic-ui-react";

const FriendRequest = ({ username, declineRequest, acceptRequest }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>Friend Request!</Card.Header>
        <Card.Meta>from {username}</Card.Meta>
        <Card.Description>
          You've recieved a new friend request from {username}, will you accept?
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button color="green" onClick={e => acceptRequest(username)}>
            Approve
          </Button>
          <Button color="red" onClick={e => declineRequest(username)}>
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default FriendRequest;
