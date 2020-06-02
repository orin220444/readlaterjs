const get = require('axios').get;
/**
 * takes url and gets real url
 * @param {string} url - url to check
 * @callback
 * @param {string} callback real url
 */
async function axios(url, callback) {
  try {
    return await get(url)
        .then(function(response) {
          const realURL = response.request.res.responseUrl;
          console.log(`Original url: ${url},
real url ${realURL}`);
          callback(realURL);
        });
  } catch (error) {
    console.log(error);
  };
}
module.exports = axios;
