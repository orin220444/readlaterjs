import {partialSearch} from '../database/index.js';
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/telegraf` if it exists or ... Remove this comment to see the full error message
import Scene from 'telegraf/scenes/wizard/index.js';
import {Composer, Context} from 'telegraf';
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
export const handleSearch = new Scene('SearchScene',
    (ctx: Context) => {
      ctx.reply('what do you need to find?');
      return ctx.wizard.next();
    }, searcher, (ctx: Context) => {
      ctx.wizard.leave();
    });
