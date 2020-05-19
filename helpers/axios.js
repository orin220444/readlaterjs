const get = require('axios').get;
/**
 * takes url and gets real url and HTML of web page
 * @param {string} url - url to check
 * @return {string} real url
 * @return {string} HTML of web page
 */
async function axios(url) {
  try {
    return await get(url)
        .then(function(response) {
          console.log(`Original url: ${url},
Real url: ${response.request.res.responseUrl}`);
          return {
            realURL: response.request.res.responseUrl,
            page: response.data,
          };
        });
  } catch (error) {
    console.log(error);
  };
}
module.exports = axios;
// TODO: return multiply variables
