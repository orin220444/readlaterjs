import {keyboard} from '../helpers/keyboard.js';
import {sendLog} from '../helpers/log.js';
import {getRandomPost} from '../database/index.js';
import {Context} from 'telegraf';
export const handleRandom = async (ctx: Context):Promise<void> => {
  const randomPost = await getPost();
  sendLog(`Random post: ${randomPost.originalUrl}`);
  try {
    await ctx.reply(
        randomPost.originalUrl, keyboard,
        {reply_to_message_id: ctx.message.message_id});
  } catch (error) {
    sendLog(error);
  }

  /**
   * send random non read post to user
   * @return {object} post from the db
   * @param {callback} callback
   */
  async function getPost():Promise<unknown> {
    try {
      const randomPost = await getRandomPost();
      return randomPost;
    } catch (error) {
      throw new Error(`error while getting random post: ${error}`);
    }
  }
};
