const Post = require('../database/models');
const bot = require('../bot');
// const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup');
// const {inlineKeyboard} = require('telegraf/markup');
module.exports = async (ctx) => {
  const posts = await Post.find(/* {asReaded: false}*/);
  const randompost = posts[
      Math.floor(Math.random()*posts.length)
  ];
  ctx.reply(
      randompost.originalURL, Markup.inlineKeyboard([
        Markup.callbackButton('Archive', 'Readed'),
      ]).extra(),
  );
  bot.on('callback_query', async (ctx) => {
    console.log(ctx.callbackQuery);
    if (ctx.callbackQuery.data === 'Readed') {
      console.log('archiving');
      await archive(ctx.callbackQuery.message.text);
      ctx.reply('archived!');
    }
  });
  /**
   * set asReaded = true in the db to the page
   * @param {string} url originalUrl of the web page
   */
  async function archive(url) {
    const post = await Post.update({originalURL: url},
        {asReaded: true},
    );
    console.log('posts modified', post.nModified);
  }
};
