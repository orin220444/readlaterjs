require('dotenv').config({path: './.env'});
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const finder = require('./helpers/linkfinder');
const parse = require('./helpers/parse');
const saveToDB = require('./helpers/saveToDB')
bot.on('message', async (ctx) => {
  const message = ctx.message.message_id
  console.log(ctx.message.caption_entities);
  await finder(ctx.message).then((urls) => {
    let i = 0
    for (i in urls){
    const url = urls[i]
    console.log(url);
    saveToDB(url)
    //parse(url);
  }
  });
  await ctx.deleteMessage(message)
  });
bot.launch();
