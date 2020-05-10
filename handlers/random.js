const Post = require('../database/models');
const Markup = require('telegraf/markup');
module.exports = async (ctx) => {
  const posts = await Post.find(/* {asReaded: false}*/);
  const randompost = posts[
      Math.floor(Math.random()*posts.length)
  ];
  console.log(randompost.originalURL);
  ctx.reply(
      randompost.originalURL, Markup.inlineKeyboard([
        Markup.callbackButton('Archive', 'Readed'),
        Markup.callbackButton('Delete', 'Delete'),
      ]).extra(),
  );
};
