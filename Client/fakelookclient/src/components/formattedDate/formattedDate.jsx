import moment from "moment";

const FormattedDate = ({ date = null, format = null }) => {
  const fDate = date ? moment(date.toString()) : moment(new Date());
  return <>{format ? fDate.format(format) : fDate.toString()}</>;
};

export default FormattedDate;
