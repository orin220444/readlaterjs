import {partialSearch} from '../database/index.js';
import {Composer, Context, WizardScene} from 'telegraf';
const searcher = new Composer();
searcher.on('message', async (ctx: Context) => {
  console.log(ctx.message);
  const data = await partialSearch(ctx.message.text);
  console.log(data);
  for (const post of data) {
    ctx.reply(post.originalUrl);
  }
  return ctx.wizard.next();
});
export const handleSearch = new WizardScene('SearchScene',
      return ctx.wizard.next();
    }, searcher, (ctx: Context) => {
      ctx.wizard.leave();
    });
