import bot from '../bot';
import axios from 'axios';
import cheerio from 'cheerio';
import {Post} from '../post';

export const handleImport = async (ctx) => {
  const data = await getFile(ctx);
  saveLinks(parseLinks(data));
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
  for (link of links) {
    const post = new Post(link);
    await post.savePost();
  }
}
/**
 * get file from telegram
 * @param {any} ctx telegraf context
 */
async function getFile(ctx) {
  ctx.reply('send a file');
  const data = bot.on('message', async (ctx) => {
    const file = await ctx.telegram.getFileLink(ctx.message.document.file_id);
    const data = await axios.get(file)
        .then(function(response) {
          return response.data;
        });
    return data;
  });
  return data;
}
