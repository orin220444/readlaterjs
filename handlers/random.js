import {keyboard} from '../helpers/keyboard.js';
import {sendLog} from '../src/log.js';
import {getRandomPost} from '../database/index.js';
export const handleRandom = async (ctx) => {
  const randomPost = await getPost();
  sendLog(`Random post: ${randomPost.originalURL}`);
  ctx.reply(
      randomPost.originalURL, keyboard,
      {reply_to_message_id: ctx.message.message_id});
};


/**
   * send random non read post to user
   * @return {object} post from the db
   * @param {callback} callback
   */
async function getPost() {
  const randomPost = await getRandomPost();
  return randomPost;
};
