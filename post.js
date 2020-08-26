import {sendLog} from './src/log';
/** @typedef Post */
export class Post {
  /** @param {string} url - url of the page */
  constructor(url) {
    this.url = url;
  }
  /**
* saves url
* @param {string} url url to save
*/
  async savePost() {
    try {
      await urlCheck(this.url) .then(async function(realURL) {
        sendLog('sending url to the db');
        await saveToDB(realURL).then( logSuccess(realURL));
      });
    } catch (error) {
      sendLog(error);
    }
  }
}
