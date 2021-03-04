import types from "../enviroments/actionTypes";


const LocationReducer = (state = [], action) => {
    if (action.type === types.SELECTED_LOCATION) {
      return action.payload;
    }
  
    return state;
  };
  
  export default LocationReducer;