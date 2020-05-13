require('dotenv').config({path: './.env'});
<<<<<<< HEAD
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const finder = require('./helpers/linkfinder');
const telegraph = require('./helpers/telegraph')
bot.on('message', async (ctx) => {
  console.log('test')
  await finder(ctx.message).then(url => {
    console.log(url)
    await telegraph(url)
  })
});
=======
const bot = require('./bot');
const {
  handleRandom,
  handleAdd,
  handleQuery,
} = require('./handlers');
const updateLocaldb = require('./helpers/updateDB');
updateLocaldb();
setInterval(() => updateLocaldb(), 900 *1000 );
bot.command('random', handleRandom);
bot.on('callback_query', handleQuery);
bot.on('message', handleAdd);

>>>>>>> master
bot.launch();
