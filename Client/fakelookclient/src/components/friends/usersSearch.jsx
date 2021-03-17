import React, { useState } from "react";
import { Button, Dropdown, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { getUsersByQuery, sendFriendRequest } from "../../actions";
import "./friends.css";

const UsersSearch = (props) => {
  let searchQuery = "";
  const [selectedUser, setSelectedUser] = useState("");

  const onSearchChange = (value) => {
    searchQuery = value;
    setTimeout(async () => {
      if (value === searchQuery && value !== "") {
        props.getUsersByQuery(value);
      }
    }, 350);
  };

  const onSelect = (value) => {
    setSelectedUser(value);
  };

  const sendNewRequest = () => {
    if (selectedUser !== "") props.sendFriendRequest(selectedUser);
    else alert("Please select a user!");
  };

  return (
    <div>
      <div className="searchbar">
        <Dropdown
          placeholder="Search User..."
          fluid
          search
          options={props.users?.map((u) => {
            return { text: u, key: u, value: u };
          })}
          onChange={(e, { value }) => onSelect(value)}
          onSearchChange={({ target }) => {
            onSearchChange(target.value);
          }}
        />
      </div>
      <Button icon labelPosition="left" onClick={sendNewRequest}>
        <Icon name="add user" />
        Add User
      </Button>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users: users,
  };
};

export default connect(mapStateToProps, { getUsersByQuery, sendFriendRequest })(UsersSearch);
