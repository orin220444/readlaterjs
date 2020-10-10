import {sendLog} from '../helpers/index.js';
import {parse} from './parse.js';
import {saveToDB} from './saveToDb.js';
import {urlCheck} from './urlCheck.js';

/**
* saves url
* @param {string} url url to save
* @param {string} timeAdded timestamp when post was added to db
*/
export async function savePost(url: string,timeAdded?:string) {
  try {
    const parsedData = await parse(url);
    /**
     * Post data
     * @public
     * @typedef {Object} PostData
     * @property {string} url - original url from user
     * @property {string} realUrl - url after axios checking
     * @property {string} title - title of the parsed page
     * @property {string} content - html of the parsed page
     */
    /** @type {PostData} */
    const post = {
      url: url,
      realUrl: await urlCheck(url),
      title: parsedData.title,
      content: parsedData.content,
    };
    if (timeAdded) {
      post.timeAdded = timeAdded;
    }
    await saveToDB(post);
  } catch (error) {
    sendLog(error);
  }
}
