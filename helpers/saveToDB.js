const Post = require('../database/models.js');
/**
* saves url in the database
* @param {any} url - url to save
*/
async function saveToDB(url) {
  try {
    const data = require('../database.json');
    for (let i = 0; i < data.length; i++) {
      const post = data[i];
      if ( post.originalURL !== url) {
        await Post.create({
          originalURL: url,
        });
        await post.save();
      }
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = saveToDB;
