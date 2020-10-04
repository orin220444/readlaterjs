import axios from 'axios';
import {parseHtml} from './parseHtml.js';
import {savePost} from '../../post/index.js';
import {sendLog} from '../../src/log.js';
import WizardScene from 'telegraf/scenes/wizard/index.js';
import Composer from 'telegraf/composer.js';
const expectFile = new Composer();
expectFile.on('message', async (ctx) => {
  try {
    const file = await ctx.telegram.getFileLink(ctx.message.document.file_id);
    const data = await axios.get(file)
        .then(function(response) {
          return response.data;
        });
    saveLinks(parseHtml(data));
  } catch (error) {
    sendLog(error);
  }
  return ctx.wizard.next();
});
export const handleImport = new WizardScene('ImportScene',
    (ctx) => {
      ctx.reply('send a file');
      return ctx.wizard.next();
    },
    expectFile, (ctx) => ctx.wizard.leave());

/**
 * save posts in the db
 * @param {Array} posts - exported posts with timestaps and links
 */
async function saveLinks(posts) {
  for (const post of posts) {
    console.log(`saving ${post.link}`);
    await savePost(post.link);
  }
}
/**
 * get file from telegram
 * @param {any} ctx telegraf context
 */
/* async function getFile(ctx) {
  return data;
}*/
