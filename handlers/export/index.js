import {getAllPosts} from '../../database/index.js';
import {promisify} from 'util';
import {exportToHtml} from './exportToHtml.js';
import {exportToCsv} from './exportToCsv.js';
import {writeFile} from 'fs';
import {sendLog} from '../../src/log.js';
import {WizardScene} from 'telegraf/scenes/wizard/index.js';
import Markup from 'telegraf/markup.js';
import Composer from 'telegraf/composer';
const createFile = promisify(writeFile);
const formatSelector = new Composer();
formatSelector.action('html', (ctx) => startExport('html'));
formatSelector.action('csv', (ctx)=> startExport('csv'));
export const handleExport = new WizardScene( (ctx) => {
  const keyboard = Markup.inlineKeyboard([
    Markup.callbackButton('HTML', 'html'),
    Markup.callbackButton('CSV', 'csv'),
  ]).extra();
  ctx.reply(`In What format you want to export?`, keyboard);
  return ctx.wizard.next();
}, formatSelector, (ctx) => ctx.scene.leave());
/**
   * send document to user
   * @param {string} fileExt - extension of file to export
   */
async function sendToUser(fileExt) {
  await ctx.replyWithDocument({source: `export${fileExt}`},
  );
}
const startExport = (formatExport) => {
  console.log('getting posts to export');
  getAllPosts().then(async (posts)=> {
    const exportData = formatExport = 'html' ? exportToHtml(posts): await exportToCsv(posts);
    const fileExt = `.${formatExport}`
    createFile(`export${fileExt}`, exportData).then(() => sendToUser(fileExt))
        .catch((error) => sendLog(error));
  });
};
