require('dotenv').config({path: './.env'});
const bot = require('./bot');
const {
  handleRandom,
  handleAdd,
  handleQuery,
  handleMainten,
} = require('./handlers');
bot.command('random', handleRandom);
bot.on('callback_query', handleQuery);
bot.command('mainten', handleMainten);
bot.on('message', handleAdd);

bot.launch();
