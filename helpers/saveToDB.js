const Post = require('../database/models');
/**
* saves url in the database
* @param {any} url - url to save
*/
async function saveToDB(url) {
  const post = await Post.findOne({originalURL: url});
  if (!post) {
    try {
      const post = await Post.create({
        originalURL: url,
      });
      await post.save();
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = saveToDB;
