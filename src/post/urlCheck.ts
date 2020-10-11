import axios from 'axios';
import {sendLog} from '../helpers/index.js';
/**
 * takes url and gets real url
 * @param {string} url - url to check
 *
 * @return {Promise} real url
 */
export async function urlCheck(url: string): Promise<string> {
  try {
    const data = await axios.get(url);
    const realUrl:string = data.request.res.responseUrl;
    return realUrl;
  } catch (error) {
    throw new Error(
        `axios error: ${error}, ${error.code}, ${error.config}`);
  }
}
