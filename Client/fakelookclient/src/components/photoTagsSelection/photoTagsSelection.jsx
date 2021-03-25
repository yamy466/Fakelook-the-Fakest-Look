import { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { addTag, getTagsByQuery } from "../../services/tagsService";

const PhotoTagsSelection = props => {
  const [photoTags, setPhotoTags] = useState([]);
  const { addition, multiple, placeholder, selectedTags, onSelect } = props;
  let photoTagsSearchQuery = "";

  const onPhotoTagsSearchChange = query => {
    photoTagsSearchQuery = query;
    setTimeout(async () => {
      if (query === photoTagsSearchQuery) {
       const res = await getTagsByQuery(query);
       if(res.data) setPhotoTags(res.data)
      }
    }, 300);
  };

  const onAddTag = async (e, tag) => {
    if (photoTags.find(t => t === tag)) return;
    await addTag(tag);
    setPhotoTags([...photoTags, tag]);
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

export default PhotoTagsSelection;
