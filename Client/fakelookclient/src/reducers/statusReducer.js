import types from "../enviroments/actionTypes";

const status = (state = [], action) => {
  switch (action.type) {
    case types.FILTER_LOADING:
      return { filterStatus: "loading" };
    case types.FILTER_SUCCESS:
      return { filterStatus: "success" };
    case types.FILTER_ERROR:
      return { filterStatus: "error" };
    default:
      return state;
  }
};

export default status;
