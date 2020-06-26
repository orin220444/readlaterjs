import axios from 'axios';
import {sendLog} from '../src/log.js';
/**
 * takes url and gets real url
 * @param {string} url - url to check
 * @callback
 * @param {string} callback real url
 */
async function urlCheck(url, callback) {
  try {
    return await axios.get(url)
        .then(function(response) {
          const realURL = response.request.res.responseUrl;
          sendLog(`Original url: ${url},
real url ${realURL}`);
          callback(realURL);
        });
  } catch (error) {
    sendLog(`axios error: ${error}, ${error.code}, ${error.config.url}`);
  };
}
export default urlCheck;
