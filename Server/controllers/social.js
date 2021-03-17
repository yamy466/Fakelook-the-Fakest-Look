const socialDB = require("../DAL/socialRepository");
const authDB = require("../DAL/authRepository");
const usersDB = require("../DAL/usersRepository");

class SocialController {
  // Get friend requests
  async getFriendRequests(username) {
    let requests = await socialDB.getAllFriendRequests(username);
    return await this.getFriendRequestsAsUsernames(requests);
  }

  async getFriendRequestsAsUsernames(requestsArray) {
    let username = "";
    let users = [];
    for (let i = 0; i < requestsArray.length; i++) {
      username = await usersDB.getUserByUsernameOrId(null,requestsArray[i]).username;
      users.push(username);
    }
    return users;
  }

  async addFriend(username, friendUsername) {
    let user = await usersDB.getUserByUsernameOrId(username);
    let friendUser = await usersDB.getUserByUsernameOrId(friendUsername);
    try {
      await socialDB.addFriend(user, friendUser);
      await socialDB.deleteRequest(user, friendUser.id);
      return await this.getFriendRequestsAsUsernames(user.requests);
    } catch (error) {
      return error;
    }
  }

  async declineRequest(username, declinedUsername) {
    let user = await usersDB.getUserByUsernameOrId(username);
    let declinedUser = await usersDB.getUserByUsernameOrId(declinedUsername);
    await socialDB.deleteRequest(user, declinedUser.id);
    return await this.getFriendRequestsAsUsernames(user.requests);
  }

  async createNewRequest(userToAdd, currentUsername) {
    return await socialDB.createNewRequest(userToAdd, currentUsername);
  }
}

module.exports = new SocialController();
