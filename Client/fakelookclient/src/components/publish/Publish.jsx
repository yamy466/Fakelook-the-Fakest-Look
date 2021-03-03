import { useState } from "react";
import { Form, Image, Input, Segment } from "semantic-ui-react";
import env from "../../enviroments/enviroment";

const friendsMock = [
  { name: "shiki", id: 1 },
  { name: "almog", id: 2 },
];
const Publish = () => {
  const [photo, setPhoto] = useState("");
  const [photoTagsMock, setPhotoTasgMock] = useState([
    { title: "new", id: 1 },
    { title: "food", id: 2 },
  ]);
  const [selectedPhotoTags, setSelectedPhotoTags] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

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
      setPhoto("")
      setSelectedPhotoTags([])
      setSelectedFriends([])
  }

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

  const onPublishClick = (e) => {
      console.log("Publish!!");
  }
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
        <Form.Group>
          <Form.Button
            content="Publish"
            style={{ backgroundColor: env.mainColor }}
            onClick={onPublishClick}
          />
          <Form.Button
            content="Clear"
            onClick={onClearClick}
          />
        </Form.Group>
      </Form>
    </Segment>
  );
};

export default Publish;
