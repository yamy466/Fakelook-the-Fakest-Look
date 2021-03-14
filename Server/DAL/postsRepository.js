const { Posts } = require("./config/dbconfig");
const {writeFile,readFile, readFileSync} = require("fs");
const photosDirectory = "./DAL/photos";
class PostsRepository {
  async getAllPosts() {
    const result = await Posts.findAll({});
    return result;
  }

  readPhoto(url){
    let res;
    res = readFileSync(`${photosDirectory}/${url}.png`,{encodeURI: "BASE64"},(err,data) => {
      if(err) throw err
    })
    return res
  }

  async createNewPost({publisher,tags,taggedFriends,location,text,photo}) {
    const createdPost = await Posts.create({
      publisher: publisher,
      postedTime: new Date(),
      tags,
      taggedUsers: taggedFriends.map(t => t.name),
      location :  `(${location.lat},${location.lng})`,
      photoURL: -1,
      text: text
    })
    createdPost.photoURL = createdPost.id;
    await createdPost.save();
    const data = photo.replace(/^data:image\/\w+;base64,/, "");
    const buf = new Buffer.from(data, 'base64');
    writeFile(`${photosDirectory}/${createdPost.photoURL}.png`,buf,(err) => {
      if(err) throw err
     })
    return {...createdPost}
  }

//  async getFilteredPosts(fromDate,toDate,publishers,tags,groups,radius){
//    const posts = await Posts.findAll({})
//    if(fromDate && toDate)
//    posts = posts.filter(p => p.)
//  }
}

module.exports = new PostsRepository();
