import axios from 'axios';
/**
 * takes url and gets real url
 * @param {string} url - url to check
 *
 * @return {Promise} real url
 */
export async function urlCheck(url) {
  try {
    const realUrl = await axios.get(url)
        .then(function(response) {
          const realUrl = response.request.res.responseUrl;
          sendLog(`Original url: ${url},
    Real url: ${realUrl}`);
          return realUrl;
        });
    return realUrl;
  } catch (error) {
    throw new Error(
        `axios error: ${error}, ${error.code}, ${error.config.url}`);
  }
}
