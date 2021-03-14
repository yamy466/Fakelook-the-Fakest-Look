import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { getUsersByQuery } from "../../actions";

const PublisherSelection = props => {
  const { multiple, placeholder, users, onSelect, selectedPublishers } = props;
  let publisherSearchQuery = "";

  const onSearchChange = query => {
    publisherSearchQuery = query;
    setTimeout(() => {
      if (query === publisherSearchQuery) {
        props.getUsersByQuery(query);
      }
    }, 300);
  };

  return (
    <Dropdown
      search
      selection
      multiple={multiple}
      options={[...users, ...selectedPublishers].map(p => {
        return { text: p, key: p, value: p };
      })}
      placeholder={placeholder}
      value={selectedPublishers}
      onChange={(e, { value }) => onSelect(value)}
      onSearchChange={({ target }) => onSearchChange(target.value)}
    />
  );
};

const mapStateToProps = ({ users }) => {
  return { users };
};

export default connect(mapStateToProps, { getUsersByQuery })(PublisherSelection);
