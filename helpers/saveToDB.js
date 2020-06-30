import {Post} from '../database/models.js';
/**
* saves url in the database
* @param {any} url - url to save
*/
async function saveToDB(url) {
  findDuplicates(url, function(url) {
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
    console.log(`${url} saved!`);
  } catch (error) {
    console.log(`error while saving to db: ${error}, ${url}`);
  }
}


/**
 * checks for duplicates
 * @param {string} url url to save to db
 * @callback
 * @param {string} callback return url
 */
async function findDuplicates(url, callback) {
  try {
    const post = await Post.findOne({originalURL: url});
    if (!post) {
      callback(url);
    }
  } catch (error) {
    console.log(`error while checking for duplicates: ${error}, ${url}`);
  }
}
export default saveToDB;
