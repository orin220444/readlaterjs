const cheerio = require('cheerio');
/**
* parses web page to text
* @param {string} url url of web page to parse
* @param {string} page web page HTML
*/
async function parse(url, page) {
  try {
    console.log('test');
    const $ = cheerio.load(page);
    console.log(typeof $);
    const body = $('body').text();
    console.log(body);
  } catch (error) {
    console.log(error);
  }
}
module.exports = parse;
