import {finder, saveToDB, urlCheck, keyboard} from '../helpers/index.js';

export default async (ctx) => {
  await finder(ctx.message, function(urls) {
    getUrl(urls);
  });
  const message = ctx.message.message_id;
  /**
* check urls array for errors
* @param {array} urls array of parsed urls
*/
  async function getUrl(urls) {
    if (urls !== 'no urls!') {
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        if (url !== 'message.chat.id') {
          console.log(url);
          saveUrl(url);
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
      const x = Math.random()*15 + 1;
      console.log(`x = ${x}`);
      setTimeout( async (url) => {
        await urlCheck(url, async function(realUrl) {
          console.log('sending url to the db');
          await saveToDB(realUrl).then( logSuccess(realUrl));
        });
      }, x, url);
    } catch (error) {
      console.log(error);
    }
  }
  /**
* logs to user if success saving url
* @param {string} realUrl url to log
*/
  function logSuccess(realUrl) {
    setTimeout( async (realUrl) => {
      ctx.reply(realUrl, keyboard,
          {reply_to_message_id: message});
    }, Math.random()*30 + 1, realUrl);
  };
};
