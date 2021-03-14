const db = require("../DAL/usersRepository")

class UsersController{
    async getUsersByQuery(query){
        return await db.getUsersByQuery(query);
    }
}

module.exports = new UsersController()