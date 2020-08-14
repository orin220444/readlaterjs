import {Post} from '../database/models.js';
import {sendLog} from '../src/log.js';
export const handleQuery = async (ctx) => {
  if (ctx.callbackQuery.data === 'Readed') {
    sendLog('archiving');
    await archive(ctx.callbackQuery.message.text);
    sendLog(ctx.callbackQuery.message);
    ctx.reply('archived!',
        {reply_to_message_id: ctx.callbackQuery.message.message_id});
  } else if (ctx.callbackQuery.data === 'Delete') {
    sendLog('deleting');
    await deletePost(ctx.callbackQuery.message.text);
    ctx.reply('deleted',
        {reply_to_message_id: ctx.callbackQuery.message.message_id});
  } else if (ctx.callbackQuery.data === 'Unarchive') {
    await unArchive(ctx.callbackQuery.message.text);
    sendLog('Unarchiving');
    ctx.reply('Unarchived',
        {reply_to_message_id: ctx.callbackQuery.message.message_id});
  }
  /**
   * set asRead = true in the db to the page
   * @param {string} url originalUrl of the web page
   */
  async function archive(url) {
    const post = await Post.updateOne({originalURL: url},
        {asReaded: true},
    );
    sendLog(`posts modified: ${post.nModified}`);
  }
  /**
   * set asRead = false in the db to the page
   * @param {string} url originalUrl of the web page
   */
  async function unArchive(url) {
    const post = await Post.updateOne({originalURL: url},
        {asReaded: true},
    );
    sendLog(`posts modified: ${post.nModified}`);
  }
  /**
   * deletes document from the db
   * @param {string} url OriginalUrl of document to delete
   */
  async function deletePost(url) {
    await Post.findOneAndDelete({originalUrl: url});
  }
};
