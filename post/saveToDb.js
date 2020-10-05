import {Post as PostModel} from '../database/models.js';
/**
* saves url in the database
* @param {Object} postData
* @return {Promise} saved post
*/
export async function saveToDB(postData) {
  try {
    const isDuples = await findDuplicates(postData.url);
    if (!isDuples) {
      await save(postData);
    }
  } catch (error) {
    throw new Error(`error, not saving ${error}`);
  }
}

/**
   * checks for duplicates
   * @param {string} url url to save to db
   *
   * @return {boolean} is url already in database
   */
async function findDuplicates(url) {
  try {
    const post = await PostModel.findOne({originalUrl: url});
    return post ? true : false;
  } catch (error) {
    throw new Error(
        `error while checking for duplicates: ${error}, ${url}`);
  }
}
/**
   * save to db
   * @param {Object} postData
   * @return {Promise} saves url
   */
export async function save(postData) {
  try {
    const post = await PostModel.create({
      originalUrl: postData.realUrl,
      redirectUrl: postData.url,
      title: postData.title,
      content: postData.content,
      created: postData.timeAdded,
    });
    await post.save();

    console.log(`${url} saved!`);
  } catch (error) {
    throw new Error(`error while saving to db: ${error}, ${url}`);
  }
}
