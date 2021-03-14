const { Users } = require("./config/dbconfig");
const { Op } = require("sequelize");


class UsersRepository{
    async getUsersByQuery(query){
        return await Users.findAll({
            limit: 10,
            where: {
                username: {
                    [Op.like]: `%${query}%`
                }
            }
        })
    }
}

module.exports = new UsersRepository()