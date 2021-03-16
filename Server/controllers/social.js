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
      username = await usersDB.getUsernameByID(requestsArray[i]);
      users.push(username);
    }
    return users;
  }

  async addFriend(username, friend) {
    let user = await authDB.getUserByUsername(username);
    let friendUser = await authDB.getUserByUsername(friend);
    try {
      await socialDB.addFriend(user, friendUser);
      await socialDB.deleteRequest(user, friendUser.id);
      return await this.getFriendRequestsAsUsernames(user.requests);
    } catch (error) {
      return error;
    }
  }

  async declineRequest(username, declinedUsername) {
    let user = await authDB.getUserByUsername(username);
    let declinedUserID = await usersDB.getUserIdByUsername(declinedUsername);
    await socialDB.deleteRequest(user, declinedUserID);
    return await this.getFriendRequestsAsUsernames(user.requests);
  }
}

module.exports = new SocialController();
