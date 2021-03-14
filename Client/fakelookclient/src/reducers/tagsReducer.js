import types from "../enviroments/actionTypes";

const photoTags = (state = [], action) => {
  switch (action.type) {
    case types.TAGS_CHANGE:
      return action.payload;
    case types.NEW_PHOTO_TAG:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default photoTags;
