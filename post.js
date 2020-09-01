import {sendLog} from './src/log.js';
import axios from 'axios';
import {Post as PostModel} from './database/models.js';
import Telegraph from 'telegraph-node';
import Mercury from '@postlight/mercury-parser';
const ph = new Telegraph();
const token = process.env.TELEGRAPH_TOKEN;
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
  async urlCheck(url) {
    try {
      this.realUrl = await axios.get(url)
          .then(function(response) {
            const realUrl = response.request.res.responseUrl;
            sendLog(`Original url: ${url},
  Real url: ${realUrl}`);
            return realUrl;
          });
    } catch (error) {
      throw new Error(
          `axios error: ${error}, ${error.code}, ${error.config.url}`);
    }
  }
  /**
 * save post as a telegraph page
 * @param {string} title
 * @param {string} content
 */
  async telegraph(title, content) {
    ph.createPage(token, title, content)
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
  }
  /**
* parses web page to text
* @param {string} url url of web page to parse
* @return {object} web page title and web page content
*/
  async parse(url) {
  // TODO: refactor
    try {
      const page = await Mercury.parse(url, {contentType: 'text'})
          .then((result) => {
            console.log(result.content);
            return {title: result.title, content: result.content};
          });
      this.title = page.title;
      this.content = page.content;
    } catch (error) {
      throw new Error(error);
    }
  }
  /**
   * parses a web pase and creates a telegraph with this data
   */
  createPage() {
    this.parse.then(this.telegraph())
        .catch((error)=> new Error(error));
  }
  /**
* saves url in the database
* @param {any} url - url to save
* @return {Promise} saved post
*/
  saveToDB(url) {
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
  async findDuplicates(url) {
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
  save(url, realUrl) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await PostModel.create({
          originalUrl: realUrl,
          redirectUrl: url,
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
      console.log(this);
    } catch (error) {
      sendLog(error);
    }
  }
}
