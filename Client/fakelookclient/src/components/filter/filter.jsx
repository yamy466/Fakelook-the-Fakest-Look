import { Dropdown, Form, Input, Segment } from "semantic-ui-react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { connect } from 'react-redux'
import { useState } from "react";
import DatesRangeAccordion from "../datesRangeAcconrdion/datesRangeAccordion";
import PhotoTagsSelection from "../photoTagsSelection/photoTagsSelection";
import PublisherSelection from "../publisherSelection/PublisherSelection";
import env from "../../enviroments/enviroment";
import {getFilteredPosts} from "../../actions"

const MAX_RADIUS = 100;

const groupsMock = [
  { name: "NBA Lovers", id: 1 },
  { name: "Gamers", id: 2 },
];

const Filter = props => {
  const [datesRange, setDatesRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [radius, setRadius] = useState("");
  const [selectedPhotoTags, setSelectedPhotoTags] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  
  const onFilterClick = () => {
    console.log(props);
    props.getFilteredPosts(datesRange[0].startDate,datesRange[0].endDate,selectedPublishers,selectedPhotoTags,null,null)
  }

  const onClearClick = () => {
    setSelectedGroups([]);
    setSelectedPublishers([]);
    setSelectedPhotoTags([]);
    setRadius("");
    setDatesRange([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ]);
  };

  const onRadiusChange = num => {
    if (!/^\d*$/.test(num)) {
      num = num.slice(0, num.length - 1);
    }
    if (num > MAX_RADIUS || num.length > MAX_RADIUS.toString().length) num = MAX_RADIUS;
    if (num < 0) num = "";
    setRadius(num);
  };

  return (
    <Segment attached>
      <Form size="large">
        <Form.Field
          id="datesRangeField"
          control={DatesRangeAccordion}
          datesRange={datesRange}
          setDatesRange={setDatesRange}
          label="Dates Range"
        />
        <Form.Field
          control={PublisherSelection}
          selectedPublishers={selectedPublishers}
          label="Publishers"
          multiple
          placeholder="publishers"
          onSelect={publisher => setSelectedPublishers(publisher)}
        />
        <Form.Field
          id="radiusField"
          control={Input}
          value={radius}
          label="Radius"
          placeholder="0 - 100"
          onChange={({ target }) => {
            onRadiusChange(target.value);
          }}
        />
        <Form.Field
          control={PhotoTagsSelection}
          label="Photo Tags"
          multiple
          placeholder="photo tags"
          selectedTags={selectedPhotoTags}
          onSelect={tag => setSelectedPhotoTags(tag)}
        />
        <Form.Field
          id="groupsField"
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
          options={groupsMock.map(g => {
            return { text: g.name, key: g.id, value: g };
          })}
        />
        <Form.Group>
          <Form.Button onClick={() => onFilterClick()} style={{ backgroundColor: env.mainColor }} content="Filter" />
          <Form.Button onClick={onClearClick} content="Clear" />
        </Form.Group>
      </Form>
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps,{getFilteredPosts})(Filter);
