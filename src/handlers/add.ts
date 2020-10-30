import {savePost} from '../post/index.js';
import {finder, keyboard} from '../helpers/index.js';
import {sendLog} from '../helpers/log.js';
import {Context} from 'telegraf';
import {ArrayUrl, Url} from '../helpers/linkfinder.js';
export const handleAdd = async (ctx:Context):Promise<void> => {
  const urls = finder(ctx.message);
  if (urls) {
    await getUrl(urls);
    const message = ctx.message?.message_id;
    /**
* check urls array for errors
* @param {array<string>} urls array of parsed urls
*/

    async function getUrl(urls:ArrayUrl):Promise<void> {
      for (const url of urls) {
        if (url !== 'message.chat.id') {
          try {
            await savePost(url);
            await logSuccess(url);
          } catch (error) {
            sendLog(error);
          }
        }
      }
    }
    /**
* logs to user if success saving url
* @param {string} realUrl url to log
*/
    async function logSuccess(realUrl: string): Promise<void> {
      try {
        await ctx.reply(realUrl, keyboard,
            {reply_to_message_id: message});
      } catch (error) {
        sendLog(error);
      }
    }
  }
};
