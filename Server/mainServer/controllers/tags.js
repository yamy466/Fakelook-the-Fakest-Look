const db = require("../DAL/tagsRepository");

class TagsController{
    async getTagsByQuery(query){
        return await db.getTagsByQuery(query);
    }

    async addTag(tag){
        return await db.addTag(tag);
    }
}

module.exports = new TagsController()