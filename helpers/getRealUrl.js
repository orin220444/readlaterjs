const axios = require('axios');
/**
 * takes url and gets real url
 * @param {string} url - url to check
 * @return {string} real url
 */
async function getRealURL(url) {
  const realURL = await axios.get(url)
      .then(function(response) {
        console.log(`Original url: ${url},
Real url: ${response.request.res.responseUrl}`);
        return response.request.res.responseUrl;
      });
  return realURL;
}
module.exports = getRealURL;
