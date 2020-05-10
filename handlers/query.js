const Post = require('../database/models');
module.exports = async (ctx) => {
  if (ctx.callbackQuery.data === 'Readed') {
    console.log('archiving');
    await archive(ctx.callbackQuery.message.text);
    ctx.reply('archived!');
  } else if (ctx.callbackQuery.data === 'Delete') {
    console.log('deleting');
    await deletePost(ctx.callbackQuery.message.text);
    ctx.reply('deleted');
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
  /**
   * deletes document from the db
   * @param {string} url Original url of document to delete
   */
  async function deletePost(url) {
    await Post.findOneAndDelete({originalUrl: url});
  }
};
