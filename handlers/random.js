import {keyboard} from '../helpers/keyboard.js';
import {sendLog} from '../src/log.js';
import {getRandomPost} from '../database/index.js';
export const handleRandom = async (ctx) => {
  getPost(function(randomPost) {
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
    const randomPost = await getRandomPost();
    return randomPost;
  }
};
