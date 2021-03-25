import { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { getUsersByQuery } from "../../services/usersService";

const UsersSelection = props => {
  const [users, setUsers] = useState([]);
  const { multiple, placeholder, onSelect, selectedUsers } = props;
  let publisherSearchQuery = "";

  const onSearchChange = query => {
    publisherSearchQuery = query;
    setTimeout(async () => {
      if (query === publisherSearchQuery) {
        const res = await getUsersByQuery(query);
        setUsers(res.data);
      }
    }, 300);
  };

  return (
    <Dropdown
      search
      selection
      multiple={multiple}
      options={[...users, ...selectedUsers].map(p => {
        return { text: p, key: p, value: p };
      })}
      placeholder={placeholder}
      value={selectedUsers}
      onChange={(e, { value }) => onSelect(value)}
      onSearchChange={({ target }) => onSearchChange(target.value)}
    />
  );
};

export default UsersSelection;
