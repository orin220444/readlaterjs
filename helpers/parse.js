const Mercury = require('@postlight/mercury-parser');
const axios = require('axios');
/**
* parses web page to text
* @param {string} url url of web page to parse
* @return {object} web page title and web page content
*/
exports = async function parse(url) {
  const realUrl = await getRealURL(url);
  const page = await Mercury.parse(realUrl, {contentType: 'text'})
      .then((result) => {
        console.log(result.content);
        return {title: result.title, content: result.content};
      });
  return page;
};
/**
 * takes url and gets real url
 * @param {string} url - url to check
 * @return {string} real url to parse
 */
exports = async function getRealURL(url) {
  const realURL = await axios.get(url)
      .then(function(response) {
        console.log(`Original url: ${url},
real url ${response.request.res.responseUrl}`);
        return response.request.res.responseUrl;
      });
  return realURL;
};
