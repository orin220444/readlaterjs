import {Markup} from 'telegraf';
const keyboard = Markup.inlineKeyboard([
  Markup.callbackButton('Archive', 'Readed'),
  Markup.callbackButton('Delete', 'Delete'),
]).extra();
export {keyboard};
