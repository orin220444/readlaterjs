const Post = require('../database/models')
module.exports = async (ctx) => {
    console.log(ctx.callbackQuery);
    if (ctx.callbackQuery.data === 'Readed') {
      console.log('archiving');
      await archive(ctx.callbackQuery.message.text);
      ctx.reply('archived!');
    }

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
