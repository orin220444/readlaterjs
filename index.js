require('dotenv').config({path: './.env'});
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const finder = require('./helpers/linkfinder');
const parse = require('./helpers/parse')
bot.on('message', async (ctx) => {
  console.log('test')
  await finder(ctx.message).then(url => {
    console.log(url)
    parse(url)
  })
});
bot.launch();
