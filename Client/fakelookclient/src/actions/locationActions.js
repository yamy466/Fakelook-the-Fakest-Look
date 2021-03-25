import types from "../enviroments/actionTypes";

export const selectLocation = location => ({ type: types.SELECTED_LOCATION, payload: location });