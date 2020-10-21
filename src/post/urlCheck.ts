import axios, {AxiosResponse} from 'axios';
import {sendLog} from '../helpers/index.js';
/**
 * takes url and gets real url
 * @param {string} url - url to check
 *
 * @return {Promise} real url
 */
interface AxiosData extends AxiosResponse {
  data:string,
  request: {
    res: {
      responseUrl:string
    }
  }
}
export async function urlCheck(url: string): Promise<string> {
  try {
    const data:AxiosData = await axios.get(url);
    const realUrl:string = data.request.res.responseUrl;
    return realUrl;
  } catch (error) {
    throw new Error(
        `axios error: ${error}, ${error.code}, ${error.config}`);
  }
}
