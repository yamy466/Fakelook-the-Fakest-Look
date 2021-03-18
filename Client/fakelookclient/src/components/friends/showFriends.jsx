import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFriends } from "../../actions";
import { Card, Button, Header } from "semantic-ui-react";
import "./friends.css";

class ShowFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    props.fetchFriends();
  }
  render() {
    return (
      <div>
        <Header as="h2">Your friends:</Header>
        <Card.Group>
          {this.props.friends.map((f) => {
            return (
              <div className="friendCard">
                <Card header={f}></Card>
                <Button name={f} onClick={this.props.removeFriend} color="red">
                  Remove
                </Button>
              </div>
            );
          })}
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = ({ friends }) => {
  return {
    friends: friends,
  };
};

export default connect(mapStateToProps, { fetchFriends })(ShowFriends);
