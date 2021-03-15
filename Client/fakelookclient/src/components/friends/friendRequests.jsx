import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";
import { connect } from "react-redux";
import { addFriend } from "../../actions";
import "./request.css";

class FriendRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  acceptRequest = (e) => {
    console.log(
      "accepted! a request from",
      e.currentTarget.name,
      "your name is ",
      this.props.currentUser
    );
    this.props.addFriend(this.props.currentUser, e.currentTarget.name);
  };

  declineRequest = (e) => {
    console.log(
      "Declined! a request from",
      e.currentTarget.name,
      "your name is ",
      this.props.currentUser
    );
  };

  renderRequests = () => {
    return this.props.requests?.map((username) => {
      return (
        <div className="card" key={username}>
          <Card>
            <Card.Content>
              <Card.Header>Friend Request!</Card.Header>
              <Card.Meta>from {username}</Card.Meta>
              <Card.Description>
                You've recieved a new friend request from {username}, will you
                accept?
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  name={username}
                  color="green"
                  onClick={this.acceptRequest}>
                  Approve
                </Button>
                <Button
                  name={username}
                  color="red"
                  onClick={this.declineRequest}>
                  Decline
                </Button>
              </div>
            </Card.Content>
          </Card>
        </div>
      );
    });
  };

  render() {
    return <div>{this.renderRequests()}</div>;
  }
}
const mapStateToProps = ({ social }) => {
  return {
    reqs: social,
  };
};
export default connect(mapStateToProps, { addFriend })(FriendRequests);
