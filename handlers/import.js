import bot from '../bot.js';
import axios from 'axios';
import cheerio from 'cheerio';
import {savePost} from '../post.js';

export const handleImport = async (ctx) => {
  ctx.reply('send a file');
  bot.on('message', async (ctx) => {
    const file = await ctx.telegram.getFileLink(ctx.message.document.file_id);
    const data = await axios.get(file)
        .then(function(response) {
          return response.data;
        });
    saveLinks(parseLinks(data));
  });
};
/**
 * parses links from pocket export file
 * @param {string} exportHTML HTML page
 * @return {Array} links
 */
function parseLinks(exportHTML) {
  const $ = cheerio.load(exportHTML);
  const links = [];
  $('a').each(function() {
    const link = $(this).attr('href');
    links.push(link);
  });
  return links;
}
/**
 * save posts in the db
 * @param {Array} links - parsed links
 */
async function saveLinks(links) {
  for (const link of links) {
    console.log(`saving ${link}`);
    await savePost(link);
  }
}
/**
 * get file from telegram
 * @param {any} ctx telegraf context
 */
async function getFile(ctx) {
  return data;
}