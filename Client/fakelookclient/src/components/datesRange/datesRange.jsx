import { DateRange } from "react-date-range";
import env from "../../enviroments/enviroment";

const DatesRange = ({ setDatesRange, datesRange }) => {
  const onDatesRangeChange = (e) => {
    setDatesRange([e.selection]);
  };

  return (
    <DateRange
      dateDisplayFormat="d MMM yyyy"
      editableDateInputs={true}
      onChange={onDatesRangeChange}
      rangeColors={[env.mainColor]}
      moveRangeOnFirstSelection={false}
      ranges={datesRange}
    />
  );
};

export default DatesRange;
