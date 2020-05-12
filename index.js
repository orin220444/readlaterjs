require('dotenv').config({path: './.env'});
const bot = require('./bot');
const {
  handleRandom,
  handleAdd,
  handleQuery,
} = require('./handlers');
const updateLocaldb = require('./helpers/updateDB');
updateLocaldb();
bot.command('random', handleRandom);
bot.on('callback_query', handleQuery);
bot.on('message', handleAdd);

bot.launch();
