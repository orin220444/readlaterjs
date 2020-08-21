import axios from 'axios';
import cheerio from 'cheerio';
/**
* parses web page to text
* @param {string} url url of web page to parse
*/
async function parse(url) {
  axios.get(url).then(async function(response) {
    // console.log(response.data);
    const $ = await cheerio.load(response.data);
    const data = [];
    $('html').each((i, elem)=> {
      data.push({

      });
    });
    console.log(data);
  })
      .catch(function(error) {
        console.log('error:', error);
      });
}
export {parse};
