import axios from 'axios';
import cheerio from 'cheerio';
/**
* parses web page to text
* @param {string} url url of web page to parse
*/
async function parse(url) {
  try {
    console.log('test');
    axios.get(url).then(async function(response) {
    // console.log(response);
      const $ = await cheerio.load(response);
      console.log(typeof $);
      const body = await $('body').text();
      console.log(body);
    })
        .catch(function(error) {
          console.log('error:', error);
        });
  } catch (error) {
    console.log(error);
  }
}
export default parse;
