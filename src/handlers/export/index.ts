import {getAllPosts} from '../../database/index.js';
import {promisify} from 'util';
import {exportToHtml} from './exportToHtml.js';
import {exportToCsv} from './exportToCsv.js';
import {writeFile} from 'fs';
import {sendLog} from '../../helpers/index.js';
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/telegraf` if it exists or ... Remove this comment to see the full error message
import WizardScene from 'telegraf/scenes/wizard/index.js';
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/telegraf` if it exists or ... Remove this comment to see the full error message
import Markup from 'telegraf/markup.js';
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/telegraf` if it exists or ... Remove this comment to see the full error message
import Composer from 'telegraf/composer.js';
const createFile = promisify(writeFile);
const formatSelector = new Composer();
formatSelector.action('html', (ctx: any) => startExport('html'));
formatSelector.action('csv', (ctx: any) => startExport('csv'));
export const handleExport = new WizardScene( (ctx: any) => {
  const keyboard = Markup.inlineKeyboard([
    Markup.callbackButton('HTML', 'html'),
    Markup.callbackButton('CSV', 'csv'),
  ]).extra();
  ctx.reply(`In What format you want to export?`, keyboard);
  return ctx.wizard.next();
}, formatSelector, (ctx: any) => ctx.scene.leave());
/**
   * send document to user
   * @param {string} fileExt - extension of file to export
   */
async function sendToUser(fileExt: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'ctx'.
  await ctx.replyWithDocument({source: `export${fileExt}`},
  );
}
const startExport = (formatExport: any) => {
  console.log('getting posts to export');
  getAllPosts().then(async (posts)=> {
    const exportData = formatExport = 'html' ?
    exportToHtml(posts): await exportToCsv(posts);
    const fileExt = `.${formatExport}`;
    createFile(`export${fileExt}`, exportData).then(() => sendToUser(fileExt))
        .catch((error) => sendLog(error));
  });
};