// File: ../../telegraf
import Telegraf from 'telegraf';
const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error(`Token doesn't exists`);
}
export const bot = new Telegraf(token);
