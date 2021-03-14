import http from "./httpService";

const serverRoute = "/api/Social/";

const SocialServices = {
  async getFriendRequests(username, token) {
    return await http.get(serverRoute + "getRequests/?username=" + username, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  async addNewFriend(token, friend) {
    return await http.post(
      serverRoute + "addFriend",
      {
        friend: friend,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
};

export default SocialServices;
