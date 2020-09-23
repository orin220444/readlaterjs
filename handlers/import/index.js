import axios from 'axios';
import parseLinks from './parseLinks.js'
import {savePost} from '../../post/index.js';
import {sendLog} from '../../src/log.js';
import Scene from 'telegraf/scenes/wizard/index.js';
import Composer from 'telegraf/composer.js';
const expectFile = new Composer();
expectFile.on('message', async (ctx) => {
  try {
    const file = await ctx.telegram.getFileLink(ctx.message.document.file_id);
    const data = await axios.get(file)
        .then(function(response) {
          return response.data;
        });
    saveLinks(parseLinks(data));
  } catch (error) {
    sendLog(error);
  }
  return ctx.wizard.next();
});
export const handleImport = new Scene('ImportScene',
    (ctx) => {
      ctx.reply('send a file');
      return ctx.wizard.next();
    },
    expectFile, (ctx) => ctx.wizard.leave());

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
/* async function getFile(ctx) {
  return data;
}*/
