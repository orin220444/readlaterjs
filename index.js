require('dotenv').config({path: './.env'});
const bot = require('./bot')
const {
  handleRandom,
  handleAdd,
} = require('./handlers');
bot.command('random', handleRandom);
bot.on('message', handleAdd);
bot.launch();
