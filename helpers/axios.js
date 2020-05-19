const get = require('axios').get;
/**
 * takes url and gets real url
 * @param {string} url - url to check
 * @return {string} real url
 */
async function axios(url) {
  try {
    return await get(url)
        .then(function(response) {
          console.log(`Original url: ${url},
real url ${response.request.res.responseUrl}`);
          return response.request.res.responseUrl;
        });
  } catch (error) {
    console.log(error);
  };
}
module.exports = axios;
