import 'dotenv/config.js';
import {sendLog} from './src/index.js';
import bot from './bot.js';
import {handleRandom, handleAdd, handleQuery} from './handlers/index.js';
bot.command('random', handleRandom);
bot.on('callback_query', handleQuery);
bot.on('message', handleAdd);

bot.launch().then(
    sendLog('bot started'),
);
