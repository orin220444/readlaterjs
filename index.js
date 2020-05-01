require('dotenv').config({path: './.env'});
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const finder = require('./helpers/linkfinder');
// const parse = require('./helpers/parse');
const saveToDB = require('./helpers/saveToDB');
bot.on('message', async (ctx) => {
  // const message = await ctx.message.message_id;
  // console.log(ctx.message.caption_entities);
//  ctx.reply('ишу ссылки');
  try {
    await finder(ctx.message).then( async (urls) => {
      let i = 0;
      console.log(urls);
      for (i in urls) {
        if ({}.hasOwnProperty.call(urls, i)) {
          const url = urls[i];
          if (url == undefined) {

          } if (url == 'message.chat.id') {
            if (url == 'no urls') {}
            if (url == '') {}
          } else {
            console.log(url);
            try {
              await saveToDB(url);
            } catch (error) {
              console.log(error);
            }
          }
        }
        // parse(url);
      }
    });
  } catch (error) {
    console.log(error);
  }
/* try{
  await ctx.deleteMessage(message)
}catch(error){
console.log(error)
}*/
});
bot.launch();
