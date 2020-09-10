import {Post as PostModel} from '../database/models.js';
/**
* saves url in the database
* @param {any} url - url to save
* @return {Promise} saved post
*/
export function saveToDB(url, realUrl, content, /*pageUrl*/) {
  return new Promise((resolve, reject) => {
    try {
      findDuplicates(url) .then(function(url) {
        save(url, realUrl, content, /*pageUrl*/);
        resolve();
      });
    } catch (error) {
      reject(new Error(`error, not saving ${error}`));
    }
  });
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
      const post = await PostModel.findOne({originalUrl: url});
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
/**
   * save to db
   * @param {string} url - url from user with redirects
   * @param {string} realUrl - url without redirects(may be broken)
   * @return {Promise} saves url
   */
export function save(url, realUrl, content, /*telegraphUrl*/) {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await PostModel.create({
        originalUrl: realUrl,
        redirectUrl: url,
        title: content.title,
        content: content.content,
        /*parsedUrl: telegraphUrl,*/
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
