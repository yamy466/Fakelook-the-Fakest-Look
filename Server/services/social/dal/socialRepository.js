const { Users } = require("./config/dbconfig");

class SocialRepository {
  async getAllFriendRequests(username) {
    //returns an array of all the users who sent a friend request
    let user = await this.getUserByUsernameOrId(username);
    if (user.requests === null) return [];
    else return user.requests;
  }

  async getUserByUsernameOrId(username = null, id = null) {
    if (!username && !id) throw "no id or username given in getUserByUsernameOrId method";
    let where = {};
    if (username) where.username = username;
    else if (id) where.id = id;
    return await Users.findOne({ where });
  }

  async getAllFriends(username) {
    //returns an array of all the users who sent a friend request
    let user = await this.getUserByUsernameOrId(username);
    if (user.friends === null)
     Users.update({ friends: {} }, { where: { username: user.username } });
    return user.friends;
  }

  async addFriend(user, friendUser) {
    //updates the users as eachother friends and then removes the sent request from the friend
    await this.pushNewFriend(user, friendUser);
    await this.pushNewFriend(friendUser, user);
    return [friendUser.id];
  }

  async pushNewFriend(user, friend) {
    let currentFriends = [];
    if (user.friends !== null) currentFriends = user.friends;
    currentFriends.push(friend.id);
    await Users.update({ friends: currentFriends }, { where: { username: user.username } });
  }

  async deleteRequest(user, userId) {
    let newRequests = user.requests;
    for (let i = 0; i < newRequests.length; i++) {
      if (newRequests[i] === userId) {
        newRequests.splice(i, 1);
        break;
      }
    }
    await Users.update({ requests: newRequests }, { where: { id: user.id } });
    return [user.id];
  }

  async removeFriend(user, deletedUser) {
    await this.deleteFriend(user, deletedUser.id);
    await this.deleteFriend(deletedUser, user.id);
  }

  async deleteFriend(user, userID) {
    let currrentFriends = user.friends;
    for (let i = 0; i < currrentFriends.length; i++) {
      if (currrentFriends[i] === userID) {
        currrentFriends.splice(i, 1);
        break;
      }
    }
    await Users.update({ friends: currrentFriends }, { where: { id: user.id } });
  }

  async createNewRequest(userToAdd, currentUsername) {
    let addedUser = await this.getUserByUsernameOrId(userToAdd);
    let currentUser = await this.getUserByUsernameOrId(currentUsername);
    let reqs = addedUser.requests;
    if (this.isFriend(addedUser, currentUser.id) || this.isRequestExists(addedUser, currentUser.id))
      return "request exists";
    if (!reqs) reqs = [];
    reqs.push(currentUser.id);
    await Users.update({ requests: reqs }, { where: { id: addedUser.id } });
  }

  isRequestExists = (user, requestingUserID) => {
    if(!user.requests) return false;
    return user.requests.includes(r => r === requestingUserID)
  };

  isFriend = (addedUser, currentUserID) => {
    if(!addedUser.friends) return false 
    return addedUser.friends.includes(f => f === currentUserID)
  };
}

module.exports = new SocialRepository();
