import { useState } from "react";
import { Form, FormField, Image, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { selectLocation } from "../../actions/locationActions";
import { addPost } from "../../actions/postsActions";
import env from "../../enviroments/enviroment";
import PhotoTagsSelection from "../photoTagsSelection/photoTagsSelection";
import UsersSelection from "../UsersSelection/UsersSelection";
import getUsersLocation from "../../helpers/getUsersLocation";
const Publish = props => {
  const [photo, setPhoto] = useState("");
  const [postText, setPostText] = useState("");
  const [selectedPhotoTags, setSelectedPhotoTags] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isMyLocation, setIsMyLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");

  const onPhotoChange = e => {
    setPhoto("");
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onClearClick = () => {
    setPhoto("");
    setSelectedPhotoTags([]);
    setSelectedUsers([]);
  };

  const onTextChange = e => {
    let text = e.target.value;
    setPostText(text);
  };

  const createPost = () => {
    let location = "";
    if (isMyLocation && currentLocation) {
      location = currentLocation;
    } else {
      location = props.selectedLocation;
    }
    const post = {
      tags: selectedPhotoTags,
      taggedFriends: selectedUsers,
      photo,
      location,
      text: postText,
    };
    return post;
  };

  const onPublishClick = async e => {
    const post = createPost();
    props.addPost(post);
    onClearClick();
  };

  return (
    <Segment attached>
      <Form size="large">
        <Form.Input label="Upload Photo" type="file" accept="image/*" onChange={onPhotoChange} />
        {photo && <Form.Field control={Image} src={photo} size="medium" />}
        <Form.Input label="Text" onChange={onTextChange} value={postText} placeholder="text" />
        <FormField
          control={PhotoTagsSelection}
          addition
          label="Photo Tags"
          multiple
          placeholder="photo tags"
          selectedTags={selectedPhotoTags}
          onSelect={tags => setSelectedPhotoTags(tags)}
        />
        <FormField
          control={UsersSelection}
          label="People Tags"
          multiple
          placeholder="people tags"
          selectedUsers={selectedUsers}
          onSelect={users => setSelectedUsers(users)}
        />
        <Segment compact>
          <Form.Checkbox
            label="My Location"
            toggle
            name="locationRG"
            checked={isMyLocation}
            onChange={() => {
              getUsersLocation(loc => {
                setCurrentLocation(loc);
                setIsMyLocation(true);
              });
            }}
          />
          <Form.Checkbox
            label="Selected Location"
            toggle
            name="locationRG"
            checked={!isMyLocation}
            onChange={() => setIsMyLocation(false)}
          />
        </Segment>
        <Form.Group>
          <Form.Button
            content="Publish"
            style={{ backgroundColor: env.mainColor }}
            onClick={onPublishClick}
          />
          <Form.Button content="Clear" onClick={onClearClick} />
        </Form.Group>
      </Form>
    </Segment>
  );
};

const mapStateToProps = ({ selectedLocation, login }) => {
  return {
    selectedLocation
  };
};

export default connect(mapStateToProps, { selectLocation, addPost })(Publish);
