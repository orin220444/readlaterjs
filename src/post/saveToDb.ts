import {Post as PostModel} from '../database/models.js';
import {PostData} from './index.js';
/**
* saves url in the database
* @param {Object} postData
* @return {Promise<void>} saved post
*/
export async function saveToDB(postData: PostData): Promise<void> {
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
   * @return {Promise<boolean>} is url already in database
   */
async function findDuplicates(url: string):Promise<boolean> {
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
   * @return {Promise<void>} saves url
   */
export async function save(postData: PostData): Promise<void> {
  try {
    const post = new PostModel({
      originalUrl: postData.realUrl,
      redirectUrl: postData.url,
      title: postData.title,
      content: postData.content,
      created: postData.timeAdded,
    });

    await post.save();
    console.log(`${postData.url} saved!`);
  } catch (error) {
    throw new Error(`error while saving to db: ${error}, ${postData.url}`);
  }
}
