import {sendLog} from '../helpers/index.js';
import {parse} from './parse.js';
import {saveToDB} from './saveToDb.js';
import {urlCheck} from './urlCheck.js';

/**
* saves url
* @param {string} url url to save
*/
export async function savePost(url: any) {
  try {
    const parsedData:object = await parse(url);
    interface PostData {
      url: string,
      realUrl: string,
      title: string,
      content: string
    }
    /** @type {PostData} */
    const post: PostData = {
      url: url,
      realUrl: await urlCheck(url),
      title: parsedData.title,
      content: parsedData.content,
    };
    await saveToDB(post);
  } catch (error) {
    sendLog(error);
  }
}
