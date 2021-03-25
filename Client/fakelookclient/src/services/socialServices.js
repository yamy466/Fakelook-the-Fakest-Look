import http from "./httpService";

const serverRoute = "/api/Social/";

export const getFriendRequests = async () => await http.get(serverRoute + "getRequests");

export const getFriends = async () => await http.get(serverRoute + "getFriends");

export const addNewFriend = async (username, friend) => {
  return await http.post(serverRoute + "addFriend", {
    friend: friend,
    username: username,
  });
};

export const declineFriendRequest = async (username, declinedUsername) => {
  return await http.post(serverRoute + "declineRequest", {
    declinedUsername: declinedUsername,
    username: username,
  });
};

export const deleteFriend = async deletedUser => {
  return await http.post(serverRoute + "deleteFriend", {
    deletedUser: deletedUser,
  });
};

export const sendNewRequest = async userToAdd => {
  return await http.post(serverRoute + "createNewRequest", {
    userToAdd: userToAdd,
  });
};
