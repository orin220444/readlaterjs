const Post = require('../database/models.js');
/**
* saves url in the database
* @param {any} url - url to save
*/
async function saveToDB(url) {
  findDuplicates(url, function() {
    save(url);
  });
}
/**
 * save to db
 * @param {string} url url to save
 */
async function save(url) {
  try {
    const post = await Post.create({
      originalURL: url,
    });
    await post.save();
  } catch (error) {
    console.log(`error while saving to db: ${error}, ${url}`);
  }
}


/**
 * checks for duplicates
 * @param {string} url url to check
 */
async function findDuplicates(url) {
  try {
    const post = await Post.findOne({originalURL: url});
    if (!post) {
      callback();
    }
  } catch (error) {
    console.log(`error while checking for duplicates: ${error}, ${url}`);
  }
}
module.exports = saveToDB;
