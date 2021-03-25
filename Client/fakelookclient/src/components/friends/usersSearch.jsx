import React, { useState } from "react";
import { Button, Dropdown, Icon } from "semantic-ui-react";
import { getUsersByQuery } from "../../services/usersService";
import "./friends.css";
import { sendNewRequest } from "../../services/socialServices";

const UsersSearch = () => {
  let searchQuery = "";
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);

  const onSearchChange = value => {
    searchQuery = value;
    setTimeout(async () => {
      if (value === searchQuery && value !== "") {
        const res = await getUsersByQuery(value);
        setUsers(res.data);
      }
    }, 350);
  };

  const onSelect = value => {
    setSelectedUser(value);
  };

  const onSendRequestClick = async () => {
    if (selectedUser !== "") await sendNewRequest(selectedUser);
    else alert("Please select a user!");
  };

  return (
    <div>
      <div className="searchbar">
        <Dropdown
          placeholder="Search User..."
          fluid
          search
          options={users?.map(u => {
            return { text: u, key: u, value: u };
          })}
          onChange={(e, { value }) => onSelect(value)}
          onSearchChange={({ target }) => {
            onSearchChange(target.value);
          }}
        />
      </div>
      <Button primary icon labelPosition="left" onClick={onSendRequestClick}>
        <Icon name="add user" />
        Add User
      </Button>
    </div>
  );
};

export default UsersSearch;
