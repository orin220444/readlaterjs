import Telegraf from 'telegraf';
// @ts-expect-error ts-migrate(2345) FIXME: Type 'undefined' is not assignable to type 'string... Remove this comment to see the full error message
const bot:any = new Telegraf(process.env.BOT_TOKEN);
export default bot;
