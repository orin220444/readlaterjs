const Post = require('../database/models');
const bot = require('../bot')
// const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup');
module.exports = async (ctx) => {
  console.log(Post);
  const posts = await Post.find();
  //  console.log(posts);
  const randompost = posts[Math.floor(Math.random()*posts.length)];
  console.log(randompost);
  // let asReaded = false
  ctx.reply(randompost.originalURL, Markup.inlineKeyboard([
    Markup.callbackButton('Archive', 'Readed'),
  ]).extra(),
  );
 bot.on('callback_quiery', (ctx) => {
  console.log(ctx.callbackQuiery)
})

};
