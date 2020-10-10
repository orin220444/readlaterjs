import {keyboard} from '../helpers/keyboard.js';
import {sendLog} from '../helpers/log.js';
import {getRandomPost} from '../database/index.js';
export const handleRandom = async (ctx: any) => {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
  getPost(function(randomPost: any) {
    sendLog(`Random post: ${randomPost.originalUrl}`);
    try {
      ctx.reply(
          randomPost.originalUrl, keyboard,
          {reply_to_message_id: ctx.message.message_id});
    } catch (error) {
      sendLog(error);
    }
  });

  /**
   * send random non read post to user
   * @return {object} post from the db
   * @param {callback} callback
   */
  async function getPost() {
    try {
      const randomPost = await getRandomPost();
      return randomPost;
    } catch (error) {
      throw new Error(`error while getting random post: ${error}`);
    }
  }
};
