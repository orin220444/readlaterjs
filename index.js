import 'dotenv/config.js';
import {sendLog} from './src/index.js';
import bot from './bot.js';
import i18n from './i18n.js';
import {
  handleRandom, handleAdd, handleQuery, handleExport,
} from './handlers/index.js';
bot.command('random', handleRandom);
bot.command('export', handleExport);
bot.on('callback_query', handleQuery);
bot.on('message', handleAdd);

bot.launch().then(
    sendLog('bot started'),
);
