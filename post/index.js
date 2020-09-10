import {sendLog} from '../src/log.js';
import {parse} from './parse.js';
import {saveToDB} from './saveToDb.js';
import {telegraph} from './telegraph.js';
import {urlCheck} from './urlCheck.js';

/**
* saves url
* @param {string} url url to save
*/
export async function savePost(url) {
  try {
    const realUrl = await urlCheck(url);
    const parsedData = await parse(url);
    const pageUrl = await telegraph(parsedData);
    await saveToDB(url, realUrl, page, parsedData, pageUrl);
  } catch (error) {
    sendLog(error);
  }
}
