import { useState, useEffect } from "react";
import { Form, Image, Input, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { selectLocation, addPost } from "../../actions";
import env from "../../enviroments/enviroment";
import PostsService from "../../services/postsService";

const friendsMock = [
  { name: "shiki", id: 1 },
  { name: "almog", id: 2 },
];
const Publish = (props) => {
  const [photo, setPhoto] = useState("");
  const [photoTagsMock, setPhotoTasgMock] = useState([
    { title: "new", id: 1 },
    { title: "food", id: 2 },
  ]);
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
    let lon = location.longitude;
    let lat = location.latitude;
    setCurrentLocation({ lat, lon });
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

  const onAddTag = (tag) => {
    if (photoTagsMock.find((t) => t.title === tag)) return;
    const newId = Math.max(...photoTagsMock.map(({ id }) => id)) + 1;
    const newTag = { title: tag, id: newId };
    setPhotoTasgMock([...photoTagsMock, newTag]);
    setSelectedPhotoTags([...selectedPhotoTags, newTag]);
  };

  const onSelectedPhotoTagsChange = (tag) => {
    setSelectedPhotoTags(tag);
  };

  const createPost = () => {
    let loc = "";
    if (isMyLocation) {
      loc = currentLocation;
    } else {
      loc = props.selectedLocation;
    }
    const post = {
      tags: selectedPhotoTags,
      taggedFriends: selectedFriends,
      photoURL: photo,
      location: loc,
    };
    return post;
  };

  const onPublishClick = async (e) => {
    const post = createPost();
    console.log("post created");
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
        {photo && <Form.Field control={Image} src={photo} size="medium" />}
        <Form.Dropdown
          search
          selection
          allowAdditions
          multiple
          options={photoTagsMock.map((t) => {
            return { text: t.title, key: t.id, value: t };
          })}
          onAddItem={(e, data) => onAddTag(data.value)}
          label="Photo Tags"
          placeholder="photo tags"
          value={selectedPhotoTags}
          onChange={(e, { value }) => {
            onSelectedPhotoTagsChange(value);
          }}
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

const mapStateToProps = ({ selectedLocation }) => {
  return {
    selectedLocation,
  };
};

export default connect(mapStateToProps, { selectLocation, addPost })(Publish);
