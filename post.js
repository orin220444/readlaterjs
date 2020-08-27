import {sendLog} from './src/log';
import {axios} from 'axios';
import {Post as PostModel} from './database/models.js';
/** @typedef Post */
export class Post {
  /** @param {string} url - url of the page */
  constructor(url) {
    this.url = url;
  }
  /**
 * takes url and gets real url
 * @param {string} url - url to check
 *
 * @return {Promise} real url
 */
  static async urlCheck(url) {
    try {
      this.realURL = await axios.get(url)
          .then(function(response) {
            const realURL = response.request.res.responseUrl;
            sendLog(`Original url: ${url},
  real url ${realURL}`);
            return realURL;
          });
    } catch (error) {
      throw new Error(
          `axios error: ${error}, ${error.code}, ${error.config.url}`);
    }
  }
  /**
* saves url in the database
* @param {any} url - url to save
* @return {Promise} saved post
*/
  static saveToDB(url) {
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
 * checks for duplicates
 * @param {string} url url to save to db
 *
 * @return {Promise} url
 */
  static async findDuplicates(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await PostModel.findOne({originalURL: url});
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
 * @param {string} url url to save
 * @return {Promise} saves url
 */
  static save(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await PostModel.create({
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
* saves url
* @param {string} url url to save
*/
  async savePost() {
    try {
      Promise.all([urlCheck(this.url)])
          .then( () => saveToDB(this.url, this.realURL))
          .catch((error) => sendLog(error));
    } catch (error) {
      sendLog(error);
    }
  }
}
