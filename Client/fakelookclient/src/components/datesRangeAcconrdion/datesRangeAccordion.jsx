import { useState } from "react";
import { Accordion, Button, Icon } from "semantic-ui-react";
import DatesRange from "../datesRange/datesRange";

const DatesRangeAccordion = ({ datesRange, setDatesRange }) => {
  const [active, setActive] = useState(false);

  const getFormatedDate = (date) => {
    return `${date.getDate()} . ${date.getMonth()} . ${date.getFullYear()}`;
  };

  const { startDate, endDate } = datesRange[0];

  return (
    <Accordion styled>
      <Accordion.Title active={active} onClick={() => setActive(!active)}>
        <h4>
          <Icon name="dropdown" />
          {startDate || endDate ? "" : "Select Dates"}
          {startDate ? getFormatedDate(new Date(startDate)) : ""}{" "}
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
      <Accordion.Content active={active}>
        <DatesRange datesRange={datesRange} setDatesRange={setDatesRange} />
      </Accordion.Content>
    </Accordion>
  );
};

export default DatesRangeAccordion;
