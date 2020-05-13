require('dotenv').config({path: './.env'});
const bot = require('./bot');
const {
  handleRandom,
  // handleAdd,
  handleQuery,
  handleImport,
} = require('./handlers');
bot.command('random', handleRandom);
bot.command('import', handleImport);
bot.on('callback_query', handleQuery);
// bot.on('message', handleAdd);

bot.launch();
