import http from "./httpService";

const serverRoute = "/api/Social/";

export const getFriendRequests = async () => await http.get(serverRoute + "getRequests");

export const getFriends = async () => await http.get(serverRoute + "getFriends");

export const addNewFriend = async friend => {
  return await http.post(serverRoute + "addFriend", { friend: friend });
};

export const declineFriendRequest = async declinedUsername => {
  return await http.post(serverRoute + "declineRequest", { declinedUsername });
};

export const deleteFriend = async deletedUser => {
  return await http.delete(serverRoute + "deleteFriend", { data: { deletedUser } });
};

export const sendNewRequest = async userToAdd => {
  return await http.post(serverRoute + "createNewRequest", { userToAdd });
};
