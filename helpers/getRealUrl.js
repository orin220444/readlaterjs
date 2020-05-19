const axios = require('axios');
/**
 * takes url and gets real url
 * @param {string} url - url to check
 * @return {string} real url
 */
async function getRealURL(url) {
  try {
    const realURL = await axios.get(url)
        .then(function(response) {
          console.log(`Original url: ${url},
real url ${response.request.res.responseUrl}`);
          return response.request.res.responseUrl;
        });
    return realURL;
  } catch (error) {
    console.log(error);
  };
}
module.exports = getRealURL;
