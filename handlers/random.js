const keyboard = require('../helpers/keyboard.js');
module.exports = async (ctx) => {
  const dataBase = require('../database.json');
  const posts = nonReadedPosts(dataBase);
  const randompost = posts[
      Math.floor(Math.random()*posts.length)
  ];
  console.log(randompost.originalURL);
  ctx.reply(
      randompost.originalURL, keyboard);
  /**
   * filters non readed posts
   * @param {object} data data from database
   * @return {object} non readed posts
   */
  function nonReadedPosts(data) {
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
};
