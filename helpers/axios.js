import axios from 'axios';
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
          console.log(`Original url: ${url},
real url ${realURL}`);
          callback(realURL);
        });
  } catch (error) {
    console.log(`axios error: ${error}, ${error.code}, ${error.config.url}`);
  };
}
export default urlCheck;
