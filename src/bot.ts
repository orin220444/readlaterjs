import Telegraf from 'telegraf';
const token = process.env.BOT_TOKEN;
if (token == undefined) {
  throw new Error(`Token didn't exists`);
}
const bot = new Telegraf(token);
export default bot;
