import {Post} from '../database/models.js';
/**
* saves url in the database
* @param {any} url - url to save
* @return {Promise} saved post
*/
function saveToDB(url) {
  return new Promise((resolve, reject) => {
    try {
      findDuplicates(url) .then(function(url) {
        save(url);
        resolve();
      });
    } catch (error) {
      reject(new Error(`error, not saving ${error}`));
    }
  });
}
/**
 * save to db
 * @param {string} url url to save
 * @return {Promise} saves url
 */
function save(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await Post.create({
        originalURL: url,
      });
      await post.save();

      console.log(`${url} saved!`);
      resolve();
    } catch (error) {
      reject(new Error(`error while saving to db: ${error}, ${url}`));
    }
  },
  );
}

/**
 * checks for duplicates
 * @param {string} url url to save to db
 *
 * @return {Promise} url
 */
async function findDuplicates(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await Post.findOne({originalURL: url});
      if (!post) {
        resolve(url);
      }
    } catch (error) {
      reject(
          new Error(
              `error while checking for duplicates: ${error}, ${url}`));
    }
  });
}
export default saveToDB;
