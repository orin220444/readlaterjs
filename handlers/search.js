import bot from '../bot.js';
import {partialSearch} from '../database/index.js';

export const handleSearch = (ctx) => {
  ctx.reply('what do you need to find?');
  bot.on('message', async (ctx) => {
    console.log(ctx.message);
    const data = await partialSearch(ctx.message.text);
    console.log(data);
    for (const post of data) {
      ctx.reply(post.originalUrl);
    }
  });
};
