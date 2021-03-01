import { useState } from "react";
import {
  Accordion,
  Button,
  Dropdown,
  Form,
  Icon,
  Segment,
} from "semantic-ui-react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import env from "../../enviroments/enviroment";

const Filter = () => {
  const [datesRange, setDatesRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [datesActive, setDatesActive] = useState(false);

  const onDatesRangeChange = (e) => {
    setDatesRange([e.selection]);
  };

  const getFormatedDate = (date) => {
    return `${date.getDate()} . ${date.getMonth()} . ${date.getFullYear()}`;
  };

  const getDatesRange = () => {
    return (
      <Accordion styled>
        <Accordion.Title
          active={datesActive}
          onClick={() => setDatesActive(!datesActive)}
        >
            <h4>

          <Icon name="dropdown" />
          Dates Range: {startDate
            ? getFormatedDate(new Date(startDate))
            : ""}{" "}
          {endDate && startDate ? <i className="fas fa-arrows-alt-h"></i> : ""}
          {endDate ? ` ${getFormatedDate(new Date(endDate))}` : ""}
          {startDate || endDate ? (
              <Button
              onClick={(e) => {
                  e.stopPropagation();
                  setDatesRange([
                  { startDate: null, endDate: null, key: "selection" },
                ]);
            }}
            >
              <i
                className="fas fa-times"
                style={{ fontSize: 20, cursor: "pointer" }}
              ></i>
            </Button>
          ) : (
              ""
              )}
            </h4>
        </Accordion.Title>
        <Accordion.Content active={datesActive}>
          <DateRange
            dateDisplayFormat="d MMM yyyy"
            editableDateInputs={true}
            onChange={onDatesRangeChange}
            rangeColors={[env.mainColor]}
            moveRangeOnFirstSelection={false}
            ranges={datesRange}
          />
        </Accordion.Content>
      </Accordion>
    );
  };

  const { startDate, endDate } = datesRange[0];
  return (
    <Segment attached>
      <Form>{getDatesRange()}</Form>
    </Segment>
  );
};

export default Filter;
