import Markup from 'telegraf/markup.js';
const keyboard = Markup.inlineKeyboard([
  Markup.callbackButton('Archive', 'Readed'),
  Markup.callbackButton('Delete', 'Delete'),
]).extra();
export default keyboard;
