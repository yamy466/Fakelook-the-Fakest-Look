import types from "../enviroments/actionTypes";

const selectedLocation = (state = null, action) => {
  if (action.type === types.SELECTED_LOCATION) {
    return action.payload;
  }

  return state;
};

export default selectedLocation;
