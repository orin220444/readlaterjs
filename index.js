require('dotenv').config({path: './.env'});
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const {
  handleRandom,
  handleAdd,
  handleMaintenance,
} = require('./handlers');
bot.command('random', handleRandom);
bot.command('maintenance', handleMaintenance);
bot.on('message', handleAdd);
bot.launch();
