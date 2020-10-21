import {partialSearch} from '../database/index.js';
import {Composer, Context, WizardScene} from 'telegraf';
const searcher = new Composer();
searcher.on('message', async (ctx: Context) => {
  console.log(ctx.message);
  if (ctx.message?.text) {
  const data = await partialSearch(ctx.message.text);
  console.log(data);
  for (const post of data) {
    await ctx.reply(post.originalUrl);
  }
  return ctx.wizard.next();
}
});
export const handleSearch = new WizardScene('SearchScene',
    async (ctx: Context) => {
      await ctx.reply('what do you need to find?');
      return ctx.wizard.next();
    }, searcher, (ctx: Context) => {
      ctx.wizard.leave();
    });
