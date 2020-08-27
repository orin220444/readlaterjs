import {sendLog} from './src/log';
import {axios} from 'axios';
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
* saves url
* @param {string} url url to save
*/
  async savePost() {
    try {
      await urlCheck(this.url) .then( async () => {
        sendLog('sending url to the db');
        await saveToDB(realURL);
      });
    } catch (error) {
      sendLog(error);
    }
  }
}
