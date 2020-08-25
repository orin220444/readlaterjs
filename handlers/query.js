const Post = require('../database/models');
module.exports = async (ctx) => {
  if (ctx.callbackQuery.data === 'Readed') {
    console.log('archiving');
    await archive(ctx.callbackQuery.message.text);
    console.log(ctx.callbackQuery.message);
    ctx.reply('archived!',
        {reply_to_message_id: ctx.callbackQuery.message.message_id});
  } else if (ctx.callbackQuery.data === 'Delete') {
    console.log('deleting');
    await deletePost(ctx.callbackQuery.message.text);
    ctx.reply('deleted',
        {reply_to_message_id: ctx.callbackQuery.message.message_id});
  }
  /**
   * set asReaded = true in the db to the page
   * @param {string} url originalUrl of the web page
   */
  async function archive(url) {
    const post = await Post.updateOne({originalURL: url},
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
