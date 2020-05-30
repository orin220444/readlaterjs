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
    // console.log(typeof $);
    //    const body = $('body').text();
    // console.log(`body: ${body}`);
    const title = $('h1.article__header_title').text();
    const article = $('article.article__content, text').text();
    console.log(title);
    console.log(article);
  } catch (error) {
    console.log(error);
  }
}
module.exports = parse;
