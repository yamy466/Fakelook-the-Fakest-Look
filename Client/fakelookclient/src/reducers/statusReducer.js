import types from "../enviroments/actionTypes";

const status = (state = [], action) => {
  switch (action.type) {
    case types.FILTER_LOADING:
      return { filterStatus: "loading" };
    case types.FILTER_SUCCESS:
      return { filterStatus: "success" };
    default:
      break;
  }
  return state;
};

export default status;
