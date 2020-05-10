const Post = require('../database/models');
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

};
