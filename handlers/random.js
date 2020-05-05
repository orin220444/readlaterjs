const Post = require('../database/models');
module.exports = async (ctx) => {
  console.log(Post);
  const posts = await Post.find();
  //  console.log(posts);
  const randompost = posts[Math.floor(Math.random()*posts.length)];
  console.log(randompost);
  ctx.reply(randompost.originalURL);
};
