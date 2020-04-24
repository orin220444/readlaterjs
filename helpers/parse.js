const axios = require('axios');
const cheerio = require('cheerio');
/**
* parses web page to text
* @param {string} url url of web page to parse
*/
async function parse(url) {
  console.log('test');
  axios.get(url).then(async function(response) {
    // console.log(response);
    const $ = await cheerio.load(response);
    console.log(typeof $)
    const body = await $('body').text();
    console.log(body);
  })
      .catch(function(error) {
        console.log('error:', error);
      });
}
module.exports = parse;
