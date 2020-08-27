import 'dotenv/config.js';
import {sendLog} from './src/index.js';
import bot from './bot.js';
import {
  handleRandom, /* handleAdd,*/ handleQuery, handleExport, handleSearch,
} from './handlers/index.js';
bot.command('random', handleRandom);
bot.command('export', handleExport);
bot.command('search', handleSearch);
bot.on('callback_query', handleQuery);
// bot.on('message', handleAdd);

bot.launch().then(
    sendLog('bot started'),
);
