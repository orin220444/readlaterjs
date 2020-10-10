import {Post as PostModel} from '../database/models.js';
/**
* saves url in the database
* @param {Object} postData
* @return {Promise<void>} saved post
*/
export async function saveToDB(postData: any) {
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
async function findDuplicates(url: any) {
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
export async function save(postData: any) {
  try {
    const post = await PostModel.create({
      originalUrl: postData.realUrl,
      redirectUrl: postData.url,
      title: postData.title,
      content: postData.content,
    });
    await post.save();

    // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'url'. Did you mean 'URL'?
    console.log(`${url} saved!`);
  } catch (error) {
    // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'url'. Did you mean 'URL'?
    throw new Error(`error while saving to db: ${error}, ${url}`);
  }
}
