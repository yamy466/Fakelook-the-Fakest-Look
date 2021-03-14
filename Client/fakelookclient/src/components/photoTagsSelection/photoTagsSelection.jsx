import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { getTagsByQuery, addPhotoTag } from "../../actions";

const PhotoTagsSelection = props => {
  const { addition, multiple, placeholder, photoTags, selectedTags, onSelect } = props;
  let photoTagsSearchQuery = "";

  const onPhotoTagsSearchChange = query => {
    photoTagsSearchQuery = query;
    setTimeout(async () => {
      if (query === photoTagsSearchQuery) {
        console.log("searching for: ", query);
        props.getTagsByQuery(query);
      }
    }, 300);
  };

  const onAddTag = (e, tag) => {
    if (props.photoTags.find(t => t === tag)) return;
    props.addPhotoTag(tag);
    onSelect([...selectedTags, tag]);
  };

  return (
    <Dropdown
      search
      selection
      allowAdditions={addition}
      onAddItem={(e, { value }) => onAddTag(e, value)}
      multiple={multiple}
      options={[...photoTags, ...selectedTags]?.map(t => {
        return { text: t, key: t, value: t };
      })}
      placeholder={placeholder}
      value={selectedTags}
      onChange={(e, { value }) => onSelect(value)}
      onSearchChange={({ target }) => {
        onPhotoTagsSearchChange(target.value);
      }}
    />
  );
};

const mapStateToProps = ({ photoTags }) => {
  return { photoTags };
};

export default connect(mapStateToProps, { getTagsByQuery, addPhotoTag })(PhotoTagsSelection);
