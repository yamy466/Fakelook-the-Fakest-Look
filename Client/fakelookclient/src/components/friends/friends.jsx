import { useState } from "react";
import { Menu, MenuItem, Label } from "semantic-ui-react";
import FriendRequests from "../friendRequests/friendRequests";
import Groups from "../groups/groups";
import UsersSearch from "./usersSearch";

const Friends = props => {
  const [activeItem, setActiveItem] = useState("");
  const [requestsCount, setRequestsCount] = useState(0)

  const requestsCountChange = (num) => setRequestsCount(num)
  
  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div>
      <Menu pointing secondary>
        <MenuItem name="newFriends" active={activeItem === "newFriends"} onClick={handleItemClick}>
          Add New Friends
        </MenuItem>
        <MenuItem name="groups" active={activeItem === "groups"} onClick={handleItemClick}>
          Groups&Friends
        </MenuItem>
        <MenuItem name="requests" active={activeItem === "requests"} onClick={handleItemClick}>
          Friend Requests
          {requestsCount > 0 && <Label color="teal">{requestsCount}</Label>}
        </MenuItem>
      </Menu>
      {(() => {
        switch (activeItem) {
          case "requests":
            return <FriendRequests requestsCountChange={requestsCountChange} />;
          case "groups":
            return <Groups />;
            default:
            return <UsersSearch />;
        }
      })()}
    </div>
  );
};



export default Friends;
