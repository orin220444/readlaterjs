import 'dotenv/config.js';
import {sendLog} from './src/index.js';
import bot from './bot.js';
import Stage from 'telegraf/stage.js';
import session from 'telegraf/session.js';
import {
  handleRandom,
  /* handleAdd,*/
  handleQuery, handleExport, handleSearch, handleImport, handleMainten,
} from './handlers/index.js';
const stage = new Stage([handleImport]);

bot.use(session());
bot.use(stage.middleware());
bot.command('random', handleRandom);
bot.command('export', handleExport);
bot.command('search', handleSearch);
bot.command('import', (ctx) => ctx.scene.enter('ImportScene'));
bot.command('mainten', handleMainten);
bot.on('callback_query', handleQuery);
// bot.on('message', handleAdd);
bot.launch().then(
    sendLog('bot started'),
);
