import {sendLog} from '../src/log.js';
import {parse} from './parse.js';
import {saveToDB} from './saveToDb.js';
import {urlCheck} from './urlCheck.js';

/**
* saves url
* @param {string} url url to save
*/
export async function savePost(url, timeAdded = undefined) {
  try {
    const post = {};
    post.url = url;
    post.realUrl = await urlCheck(url);
    const parsedData = await parse(url);
    post.title = await parsedData.title;
    post.content = await parsedData.content;
    post.timeAdded = !!timeAdded ? timeAdded: undefined
    await saveToDB(post);
  } catch (error) {
    sendLog(error);
  }
}
