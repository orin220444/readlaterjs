import Markup from 'telegraf/markup.js';
const startKeyboard = Markup.inlineKeyboard([
  Markup.callbackButton('Archive', 'Readed'),
  Markup.callbackButton('Delete', 'Delete'),
]).extra();
const archiveKeyboard = Markup.inlineKeyboard([
  Markup.callbackButton('Unarchive', 'Unarchive'),
  Markup.callbackButton('Delete', 'Delete'),
]).extra();
export {startKeyboard, archiveKeyboard};
