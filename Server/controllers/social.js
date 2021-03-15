const socialDB = require("../DAL/socialRepository");
const authDB = require("../DAL/authRepository");
const usersDB = require("../DAL/usersRepository");

class SocialController {
  // Get friend requests
  async getFriendRequests(username) {
    let requestsIds = await socialDB.getAllFriendRequests(username);
    let user = "";
    let users = [];
    for (let i = 0; i < requestsIds.length; i++) {
      user = await authDB.getUsernameByID(requestsIds[i]);
      users.push(user.username);
    }
    return users;
  }

  async addFriend(username, friend) {
    let user = await authDB.getUserByUsername(username);
    let friendUser = await authDB.getUserByUsername(friend);
    try {
      await socialDB.addFriend(user, friendUser);
      await socialDB.deleteRequest(user, friendUser.id);
      return user.id;
    } catch (error) {
      return error;
    }
  }

  async declineRequest(username, declinedUsername) {
    let user = authDB.getUserByUsername(username);
    let declinedUserID = usersDB.getUserIdByUsername(declinedUsername);
    return await socialDB.deleteRequest(user, declinedUserID);
  }
}

module.exports = new SocialController();
