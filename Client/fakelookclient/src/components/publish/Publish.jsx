import { useState, useEffect } from "react";
import { Form, FormField, Image, Input, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { selectLocation, addPost, getTagsByQuery } from "../../actions";
import env from "../../enviroments/enviroment";
import PhotoTagsSelection from "../photoTagsSelection/photoTagsSelection";

const friendsMock = [
  { name: "shiki", id: 1 },
  { name: "almog", id: 2 },
];
const Publish = (props) => {
  const [photo, setPhoto] = useState("");
  const [postText, setText] = useState("");
  const [selectedPhotoTags, setSelectedPhotoTags] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [isMyLocation, setIsMyLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () =>
    navigator.geolocation.getCurrentPosition(success, error, options);

  const success = (position) => {
    let location = position.coords;
    let lng = location.longitude;
    let lat = location.latitude;
    setCurrentLocation({ lat, lng });
  };

  const error = () => {
    alert("Error! Could not determine your current location");
  };

  const options = () => {
    return {
      enableHighAccuracy: true,
      timeout: 5000,
    };
  };

  const onPhotoChange = (e) => {
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
    setSelectedFriends([]);
  };

  const onTextChange = (e) => {
    let text = e.target.value;
    setText(text);
  };

  const createPost = () => {
    let location = "";
    if (isMyLocation) {
      location = currentLocation;
    } else {
      location = props.selectedLocation;
    }
    const post = {
      tags: selectedPhotoTags,
      taggedFriends: selectedFriends,
      photo,
      location,
      text: postText,
    };
    return post;
  };

  const onPublishClick = async (e) => {
    const post = createPost();
    props.addPost(post);
  };

  return (
    <Segment attached>
      <Form size="large">
        <Form.Input
          label="Upload Photo"
          type="file"
          accept="image/*"
          onChange={onPhotoChange}
        />
        <Form.Input label="Text" onChange={onTextChange} />
        {photo && <Form.Field control={Image} src={photo} size="medium" />}
        <FormField
          control={PhotoTagsSelection}
          addition
          label="Photo Tags"
          multiple
          placeholder="photo tags"
          selectedTags={selectedPhotoTags}
          onSelect={(tags) => setSelectedPhotoTags(tags)}
        />
        <Form.Dropdown
          search
          selection
          multiple
          options={friendsMock.map((f) => {
            return { text: f.name, key: f.id, value: f };
          })}
          label="Friends Tags"
          placeholder="friends tags"
          onChange={(e, { value }) => {
            setSelectedFriends(value);
          }}
          value={selectedFriends}
        />
        <Segment compact>
          <Form.Checkbox
            label="My Location"
            toggle
            name="locationRG"
            checked={isMyLocation}
            onChange={() => setIsMyLocation(true)}
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
    selectedLocation,
    accessToken: login.accessToken,
  };
};

export default connect(mapStateToProps, { selectLocation, addPost })(Publish);
