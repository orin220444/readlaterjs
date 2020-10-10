// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/telegraf` if it exists or ... Remove this comment to see the full error message
import Markup from 'telegraf/markup.js';
const keyboard = Markup.inlineKeyboard([
  Markup.callbackButton('Archive', 'Readed'),
  Markup.callbackButton('Delete', 'Delete'),
]).extra();
export {keyboard};
