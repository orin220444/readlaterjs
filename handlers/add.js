import {finder, saveToDB, urlCheck, keyboard} from '../helpers/index.js';
import {sendLog} from '../src/log.js';
export const handleAdd = async(ctx) => {
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
          saveUrl(url);
          sendLog(url);
        }
      }
    }
  }

  /**
* saves url
* @param {string} url url to save
*/
  async function saveUrl(url) {
    try {
      await urlCheck(url) .then(async function(realURL) {
        sendLog('sending url to the db');
        await saveToDB(realURL).then( logSuccess(realURL));
      });
    } catch (error) {
      console.log(error);
    }
  }
  /**
* logs to user if success saving url
* @param {string} realURL url to log
*/
  function logSuccess(realURL) {
    ctx.reply(realURL, keyboard,
        {reply_to_message_id: message});
  };
};
