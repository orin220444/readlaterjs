import {savePost} from '../post/index.js';
import {finder, keyboard} from '../helpers/index.js';
import {sendLog} from '../helpers/log.js';
export const handleAdd = async (ctx: any) => {
  getUrl(finder(ctx.message));
  const message = await ctx.message.message_id;
  /**
* check urls array for errors
* @param {array<string>} urls array of parsed urls
*/
  async function getUrl(urls: any) {
    if (urls !== 'no urls!') {
      for (const url of urls) {
        if (url !== 'message.chat.id') {
          // @ts-expect-error ts-migrate(2345) FIXME: Type 'Promise<void>' provides no match for the sig... Remove this comment to see the full error message
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
  async function logSuccess(realUrl: any) {
    try {
      await ctx.reply(realUrl, keyboard,
          {reply_to_message_id: message});
    } catch (error) {
      sendLog(error);
    }
  };
};
