import {Post} from '../database/models.js';
/**
* saves url in the database
* @param {any} url - url to save
* @return {Promise} saved post
*/
async function saveToDB(url) {
  try {
    const noDuplicates = await findDuplicates(url);
        noDuplicates ? save(url) : new Error('is duplicates, not saving');
  } catch (error) {
    throw (new Error(`error, not saving ${error}`));
  }
}

/**
 * save to db
 * @param {string} url - url to save
 * @return {Promise} saves url
 */
async function save(url) {
  try {
    const post = await Post.create({
      originalURL: url,
    });
    await post.save();

    console.log(`${url} saved!`);
  } catch (error) {
    throw (new Error(`error while saving to db: ${error}, ${url}`));
  }
}


/**
 * checks for duplicates
 * @param {string} url - url to save to db
 *
 * @return {Promise} url
 */
async function findDuplicates(url) {
  try {
    const post = await Post.findOne({originalURL: url});
    return !post ? true : false;
  } catch (error) {
    throw (
      new Error(
          `error while checking for duplicates: ${error}, ${url}`));
  }
}
export {saveToDB};
