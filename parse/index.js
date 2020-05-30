const cheerio = require('cheerio');
const teletype = require('./teletype.js');
/**
* parses web page to text
* @param {string} url url of web page to parse
* @param {string} page web page HTML
*/
function parse(url, page) {
  const $ = cheerio.load(page);
  domainChecker(url, $);
}
/**
 * checks the domain and launches parser
 * @param {string} url domain to check
 * @param {function} $ cheerio
 */
function domainChecker(url, $) {
  const regEx = /([^/\n\r]+)/;
  const domain = regEx.exec(url);
  console.log(domain);
  switch (url) {
    /*    case habr.com:
      habr($);
      break; */
    case teletype.in:
      teletype($);
      break;
    default:
      break;
  } (url);
}
module.exports = parse;
