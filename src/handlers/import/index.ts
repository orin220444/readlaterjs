import * as axios from 'axios';
import {parseHtml} from './parseHtml.js';
import {savePost} from '../../post/index.js';
import {sendLog} from '../../helpers/index.js';
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/telegraf` if it exists or ... Remove this comment to see the full error message
import WizardScene from 'telegraf/scenes/wizard/index.js';
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/telegraf` if it exists or ... Remove this comment to see the full error message
import Composer from 'telegraf/composer.js';
const expectFile = new Composer();
expectFile.on('message', async (ctx: any) => {
  try {
    const file = await ctx.telegram.getFileLink(ctx.message.document.file_id);
    const response = await axios.get(file);
    const data = response.data;
    saveLinks(parseHtml(data));
  } catch (error) {
    sendLog(error);
  }
  return ctx.wizard.next();
});
export const handleImport = new WizardScene('ImportScene',
    (ctx: any) => {
      ctx.reply('send a file');
      return ctx.wizard.next();
    },
    expectFile, (ctx: any) => ctx.wizard.leave());

/**
 * save posts in the db
 * @param {Array} posts - exported posts with timestaps and links
 */
async function saveLinks(posts: any) {
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
