import types from "../enviroments/actionTypes";

const users = (state = [], action) => {
    switch (action.type) {
        case types.USERS_CHANGE:
            return action.payload;
        default:
            return state
    }
};

export default users;
