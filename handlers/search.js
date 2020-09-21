import {partialSearch} from '../database/index.js';
import Scene from 'telegraf/scenes/wizard/index.js';
import Composer from 'telegraf/composer.js';
const searcher = new Composer();
searcher.on('message', async (ctx) => {
  console.log(ctx.message);
  const data = await partialSearch(ctx.message.text);
  console.log(data);
  for (const post of data) {
    ctx.reply(post.originalUrl);
  }
  return ctx.wizard.next();
});
export const handleSearch = new Scene('SearchScene',
    (ctx) => {
      ctx.reply('what do you need to find?');
      return ctx.wizard.next();
    }, searcher, (ctx) => {
      ctx.wizard.leave();
    });
