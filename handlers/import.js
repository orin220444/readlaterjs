const bot = require('../bot');
const axios = require('axios');
const cheerio = require('cheerio');
/**
 * get file from telegram
 * @param {any} ctx telegraf context
 */
async function getFile(ctx) {
  ctx.reply('send a file');
  bot.on('message', async (ctx) => {
    const file = await ctx.telegram.getFileLink(ctx.message.document.file_id);
    axios.get(file)
        .then(function(response) {
          parseLinks(response.data);
        });
  });
}
/**
 * parses links from pocket export file
 * @param {string} exportHTML HTML page
 */
function parseLinks(exportHTML) {
  const $ = cheerio.load(exportHTML);
  const links = [];
  $('a').each(function(index, element) {
    console.log(element.namespace/* , element*/);
    const link = $('this').text();
    links.push(link);
  });
  console.log(links);
}
module.exports = getFile;
