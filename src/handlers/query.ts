import {Post} from '../database/models.js';
import {sendLog} from '../helpers/log.js';
export const handleQuery = async (ctx: any) => {
  if (ctx.callbackQuery.data === 'Readed') {
    sendLog('archiving');
    await archive(ctx.callbackQuery.message.text);
    sendLog(ctx.callbackQuery.message);
    ctx.reply('archived!',
        {reply_to_message_id: ctx.callbackQuery.message.message_id});
  } else if (ctx.callbackQuery.data === 'Delete') {
    sendLog('deleting');
    await deletePost(ctx.callbackQuery.message.text);
    const botMessage = await ctx.reply('deleted',
        {reply_to_message_id: ctx.callbackQuery.message.message_id});
    console.log(botMessage, ctx.callbackQuery);
    setTimeout(() => {
      try {
        ctx.deleteMessage(ctx.callbackQuery.message.message_id);
        ctx.deleteMessage(botMessage.message_id);
      } catch (error) {
        sendLog(error);
      }
    }, 5 * 1000);
  } else if (ctx.callbackQuery.data === 'Unarchive') {
    await unArchive(ctx.callbackQuery.message.text);
    sendLog('Unarchiving');
    ctx.reply('Unarchived',
        {reply_to_message_id: ctx.callbackQuery.message.message_id});
  }
  /**
   * set asRead = true in the db to the page
   * @param {string} url - originalUrl of the web page
   */
  async function archive(url: any) {
    const post = await Post.updateOne({originalUrl: url},
        {read: true},
    );
    sendLog(`posts modified: ${post.nModified}`);
  }
  /**
   * set asRead = false in the db to the page
   * @param {string} url - originalUrl of the web page
   */
  async function unArchive(url: any) {
    const post = await Post.updateOne({originalUrl: url},
        {read: true},
    );
    sendLog(`posts modified: ${post.nModified}`);
  }
  /**
   * deletes document from the db
   * @param {string} url - OriginalUrl of document to delete
   */
  async function deletePost(url: any) {
    await Post.findOneAndDelete({originalUrl: url});
  }
};
