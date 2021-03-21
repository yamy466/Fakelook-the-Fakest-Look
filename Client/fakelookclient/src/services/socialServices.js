import http from "./httpService";

const serverRoute = "/api/Social/";

const SocialServices = {
  async getFriendRequests(token) {
    return await http.get(serverRoute + "getRequests", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  async getFriends(token) {
    return await http.get(serverRoute + "getFriends", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  async addNewFriend(token, username, friend) {
    return await http.post(
      serverRoute + "addFriend",
      {
        friend: friend,
        username: username,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },

  async declineFriendRequest(token, username, declinedUsername) {
    return await http.post(
      serverRoute + "declineRequest",
      {
        declinedUsername: declinedUsername,
        username: username,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },

  async deleteFriend(token, deletedUser) {
    return await http.post(
      serverRoute + "deleteFriend",
      {
        deletedUser: deletedUser,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },

  async sendNewRequest(token, userToAdd) {
    return await http.post(
      serverRoute + "createNewRequest",
      {
        userToAdd: userToAdd,
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
