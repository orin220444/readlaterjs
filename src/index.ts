import 'dotenv/config.js';
import {sendLog} from './helpers/index.js';
import {bot} from './bot.js';
import {Context, Stage, session} from 'telegraf';
import {
  handleRandom,
  handleAdd,
  handleQuery, handleExport, handleSearch, handleImport, handleMainten,
} from './handlers/index.js';
const stage = new Stage([handleImport, handleSearch, handleExport]);

bot.use(session());
bot.use(stage.middleware());
bot.command('random', handleRandom);
bot.command('export', (ctx:Context)=> ctx.scene.enter('ExportScene'));
bot.command('search', (ctx:Context) => ctx.scene.enter('SearchScene'));
bot.command('import', (ctx:Context) => ctx.scene.enter('ImportScene'));
bot.command('mainten', handleMainten);
bot.on('callback_query', handleQuery);
bot.on('message', handleAdd);
bot.launch();
sendLog('bot started');
