const { Tags } = require("./config/dbconfig");
const { Op } = require("sequelize");

class TagsRepository{
    async getTagsByQuery(query){
        return await Tags.findAll({
            limit: 10,
            where: {
                tag: {
                    [Op.like]: `%${query}%`
                }
            }
        })
    }

    async addTag(tag){
       return await Tags.create({
            tag
        })
    }
}

module.exports = new TagsRepository()