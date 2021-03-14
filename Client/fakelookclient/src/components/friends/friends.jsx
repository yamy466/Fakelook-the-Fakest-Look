import React, { Component } from "react";
import { Menu, Button, MenuItem, Label } from "semantic-ui-react";
import FriendRequests from "./friendRequests";
import Groups from "./groups";
import UsersSearch from "./usersSearch";
import { connect } from "react-redux";
import { fetchFriendRequests } from "../../actions";

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    props.fetchFriendRequests();
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu secondary tabular>
          <MenuItem
            name="newFriends"
            active={activeItem === "newFriends"}
            onClick={this.handleItemClick}>
            Add New Friends
          </MenuItem>
          <MenuItem
            name="groups"
            active={activeItem === "groups"}
            onClick={this.handleItemClick}>
            Groups
          </MenuItem>
          <MenuItem
            name="requests"
            active={activeItem === "requests"}
            onClick={this.handleItemClick}>
            Friend Requests
            {this.props.requests && (
              <Label color="teal">{this.props.requests.length}</Label>
            )}
          </MenuItem>
        </Menu>
        {(() => {
          switch (activeItem) {
            case "requests":
              return (
                <FriendRequests
                  requests={this.props.requests}
                  currentUser={this.props.username}
                />
              );
            case "groups":
              return <Groups />;
            case "newFriends":
              return <UsersSearch />;
            default:
              break;
          }
        })()}
      </div>
    );
  }
}

const mapStateToProps = ({ login, social }) => {
  return {
    username: login.username,
    requests: social,
  };
};

export default connect(mapStateToProps, { fetchFriendRequests })(Friends);
