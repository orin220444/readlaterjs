require('dotenv').config({path: './.env'});
const bot = require('./bot.js');
const {
  handleRandom,
  handleAdd,
  handleQuery,
  handleExport,
} = require('./handlers');
const updateLocaldb = require('./helpers/updateDB.js');
updateLocaldb();
setInterval(() => updateLocaldb(), 900 *1000 );
bot.command('random', handleRandom);
bot.command('export', handleExport);
bot.on('callback_query', handleQuery);
bot.on('message', handleAdd);

bot.launch();
