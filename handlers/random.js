const keyboard = require('../helpers/keyboard.js');
module.exports = async (ctx) => {
  const randomPost = getPost();
  console.log(`Random post: ${randomPost.originalURL}`);
  ctx.reply(
      randomPost.originalURL, keyboard,
      {reply_to_message_id: ctx.message.message_id});
  /**
   * filters non read posts
   * @param {object} data data from database
   * @return {object} non read posts
   */
  function nonReadPosts(data) {
    const posts = [];
    for (let i = 0; i < data.length; i++) {
      const post = data[i];
      if (post.asReaded === false) {
        posts.push(post);
      }
      if (!post.asReaded) {
        posts.push(post);
      }
    }
    return posts;
  }
  /**
   * send random non read post to user
   * @return {object} post from the db
   */
  function getPost() {
    const dataBase = require('../database.json');
    const posts = nonReadPosts(dataBase);
    const randomPost = posts[
        Math.floor(Math.random()*posts.length)
    ];
    return randomPost;
  }
};
