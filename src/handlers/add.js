import {savePost} from '../post/index.js';
import {finder, keyboard} from '../helpers/index.js';
import {sendLog} from '../helpers/log.js';
export const handleAdd = async (ctx) => {
  getUrl(finder(ctx.message));
  const message = ctx.message.message_id;
  /**
* check urls array for errors
* @param {array<string>} urls array of parsed urls
*/
  async function getUrl(urls) {
    if (urls !== 'no urls!') {
      for (const url of urls) {
        if (url !== 'message.chat.id') {
          savePost(url).then(logSuccess(url))
              .catch((error) => sendLog(error));
        }
      }
    }
  }
  /**
* logs to user if success saving url
* @param {string} realUrl url to log
*/
  async function logSuccess(realUrl) {
    try {
      await ctx.reply(realUrl, keyboard,
          {reply_to_message_id: message});
    } catch (error) {
      sendLog(error);
    }
  };
};
