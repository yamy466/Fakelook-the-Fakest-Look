import { Button, Dropdown, Form, Input, Segment } from "semantic-ui-react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useEffect, useState } from "react";
import DatesRangeAccordion from "../datesRangeAcconrdion/datesRangeAccordion";
const MAX_RADIUS = 100;
const publishers = [
  { name: "shiki", id: 1 },
  { name: "almog", id: 2 },
];
const photoTagsMock = [
  { title: "mountains", id: 1 },
  { title: "food", id: 2 },
  { title: "fitness", id: 3 },
];
const groupsMock = [
  { name: "NBA Lovers", id: 1 },
  { name: "Gamers", id: 2 },
];

const Filter = () => {
  const [datesRange, setDatesRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [radius, setRadius] = useState("");
  const [photoTags, setPhotoTags] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);

  const onRadiusChange = (num) => {
    if (!/^\d*$/.test(num)) {
      num = num.slice(0, num.length - 1);
    }
    if (num > MAX_RADIUS || num.length > MAX_RADIUS.toString().length)
      num = MAX_RADIUS;
    if (num < 0) num = "";
    setRadius(num);
  };

  return (
    <Segment attached>
      <Form size="large">
        <Form.Field
          control={DatesRangeAccordion}
          datesRange={datesRange}
          setDatesRange={setDatesRange}
          label="Dates Range"
        />
        <Form.Field
          control={Dropdown}
          value={selectedPublishers}
          onChange={(e, { value }) => {
            setSelectedPublishers(value);
          }}
          label="Publisher"
          multiple
          selection
          search
          placeholder="publisher"
          options={publishers.map((p) => {
            return { text: p.name, key: p.id, value: p };
          })}
        />
        <Form.Field
          control={Input}
          value={radius}
          label="Radius"
          placeholder="0 - 100"
          onChange={({ target }) => {
            onRadiusChange(target.value);
          }}
        />
        <Form.Field
          control={Dropdown}
          value={photoTags}
          label="Photo Tags"
          search
          selection
          multiple
          placeholder="photo tag"
          onChange={(e, { value }) => {
            setPhotoTags(value);
          }}
          options={photoTagsMock.map((p) => {
            return { text: p.title, key: p.id, value: p };
          })}
        />
        <Form.Field
          control={Dropdown}
          value={selectedGroups}
          onChange={(e, { value }) => {
            setSelectedGroups(value);
          }}
          multiple
          search
          selection
          label="Groups"
          placeholder="groups"
          options={groupsMock.map((g) => {
            return { text: g.name, key: g.id, value: g };
          })}
        />
        <Form.Group floated="right">

        <Form.Field
        control={Button}
          className="right"
          onClick={() => {}}
          style={{ backgroundColor: "#7EB1CC" }}
          content="Filter"
          
          />
          <Form.Field
          control={Button}
          className="right"
          onClick={() => {}}
          content="Clear"
          />
          
          </Form.Group>
      </Form>
    </Segment>
  );
};

export default Filter;
