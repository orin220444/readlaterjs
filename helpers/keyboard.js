const Markup = require('telegraf/markup.js');
const keyboard = Markup.inlineKeyboard([
  Markup.callbackButton('Archive', 'Readed'),
  Markup.callbackButton('Delete', 'Delete'),
]).extra();
module.exports = keyboard;
