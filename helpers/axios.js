import axios from 'axios';
import {sendLog} from '../src/log.js';
/**
 * takes url and gets real url
 * @param {string} url - url to check
 *
 * @return {Promise} real url
 */
async function urlCheck(url) {
  return new Promise((resolve, reject) => {
    try {
      axios.get(url)
          .then(function(response) {
            const realURL = response.request.res.responseUrl;
            sendLog(`Original url: ${url},
real url ${realURL}`);
            resolve(realURL);
          });
    } catch (error) {
      reject(
          new Error(
              `axios error: ${error}, ${error.code}, ${error.config.url}`));
    }
  },
  );
}

export default urlCheck;
