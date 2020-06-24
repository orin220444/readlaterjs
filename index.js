import 'dotenv/config.js';
import bot from './bot.js';
import {handleRandom, handleAdd, handleQuery} from './handlers/index.js';
import updateLocaldb from './helpers/updateDB.js';
updateLocaldb();
setInterval(() => updateLocaldb(), 900 *1000 );
bot.command('random', handleRandom);
bot.on('callback_query', handleQuery);
bot.on('message', handleAdd);

bot.launch();
