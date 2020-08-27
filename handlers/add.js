import {Post} from '../post.js';
import {finder, keyboard} from '../helpers/index.js';
import {sendLog} from '../src/log.js';
export const handleAdd = async (ctx) => {
  getUrl(finder(ctx.message));
  const message = ctx.message.message_id;
  /**
* check urls array for errors
* @param {array} urls array of parsed urls
*/
  async function getUrl(urls) {
    if (urls !== 'no urls!') {
      for (const url of urls) {
        if (url !== 'message.chat.id') {
          const post = new Post(url);
          post.savePost(url).then(logSuccess(url))
              .catch((error) => sendLog(error));
        }
      }
    }
  }
  /**
* logs to user if success saving url
* @param {string} realURL url to log
*/
  async function logSuccess(realURL) {
    try {
      await ctx.reply(realURL, keyboard,
          {reply_to_message_id: message});
    } catch (error) {
      sendLog(error);
    }
  };
};
