import {Post as PostModel} from '../database/models.js';
/**
* saves url in the database
* @param {string} url - url from user with redirects
* @param {string} realUrl - url without redirects(may be broken)
* @param {object} content - title + content
* @return {Promise} saved post
*/
export async function saveToDB(url, realUrl, content /* pageUrl*/) {
  try {
    const isDuples = await findDuplicates(url);
    if (!isDuples) {
      await save(url, realUrl, content /* pageUrl*/);
    }
  } catch (error) {
    throw new Error(`error, not saving ${error}`);
  }
}

/**
   * checks for duplicates
   * @param {string} url url to save to db
   *
   * @return {Promise} url
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
   * @param {string} url - url from user with redirects
   * @param {string} realUrl - url without redirects(may be broken)
   * @param {object} content - title + content
   * @return {Promise} saves url
   */
export async function save(url, realUrl, content /* telegraphUrl*/) {
  try {
    const post = await PostModel.create({
      originalUrl: realUrl,
      redirectUrl: url,
      title: content.title,
      content: content.content,
      /* parsedUrl: telegraphUrl,*/
    });
    await post.save();

    console.log(`${url} saved!`);
  } catch (error) {
    throw new Error(`error while saving to db: ${error}, ${url}`);
  }
}
