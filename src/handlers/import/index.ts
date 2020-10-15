import axios from 'axios';
import {parseHtml, ExportPost} from './parseHtml.js';
import {savePost} from '../../post/index.js';
import {sendLog} from '../../helpers/index.js';
import WizardScene from 'telegraf/scenes/wizard/index.js';
import {Composer, Context} from 'telegraf';
const expectFile = new Composer();
expectFile.on('message', async (ctx: Context) => {
  try {
    if (ctx.message?.document?.file_id) {
      const file = await ctx.telegram.getFileLink(ctx.message.document.file_id);
      const response = await axios.get(file);
      const data = response.data;
      const html = parseHtml(data);
      await saveLinks(html);
    }
  } catch (error) {
    sendLog(error);
  }
  return ctx.wizard.next();
});
export const handleImport = new WizardScene('ImportScene',
    (ctx: Context) => {
      ctx.reply('send a file');
      return ctx.wizard.next();
    },
    expectFile, (ctx: Context) => ctx.wizard.leave());

/**
 * save posts in the db
 * @param {Array} posts - exported posts with timestaps and links
 */
async function saveLinks(posts: Array<ExportPost>):Promise<void> {
  for (const post of posts) {
    if (!post.link) {
      throw new Error('does not exists post.link');
    }
    console.log(`saving ${post.link}`);
    await savePost(post.link, post.timeAdded);
  }
}
/**
 * get file from telegram
 * @param {any} ctx telegraf context
 */
/* async function getFile(ctx) {
  return data;
}*/
