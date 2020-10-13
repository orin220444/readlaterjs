import {sendLog} from '../helpers/index.js';
import {parse} from './parse.js';
import {saveToDB} from './saveToDb.js';
import {urlCheck} from './urlCheck.js';


export interface PostData {
  url: string,
  realUrl: string,
  title: string,
  content: string
}
/**
* saves url
* @param {string} url url to save
*/
export async function savePost(url: string): Promise<void> {
  try {
    const parsedPageData = await parse(url);

    /** @type {PostData} */
    const post: PostData = {
      url: url,
      realUrl: await urlCheck(url),
      title: parsedPageData.title,
      content: parsedPageData.content,
    };
    await saveToDB(post);
  } catch (error) {
    sendLog(error);
  }
}