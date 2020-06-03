const {
  finder,
  saveToDB,
  axios,
  keyboard,
} = require('../helpers');
module.exports = async (ctx) => {
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
        await axios(url, async function(realURL) {
          console.log('sending url to the db');
          await saveToDB(realURL).then( logSuccess(realURL));
        });
      }, x, url);
    } catch (error) {
      console.log(error);
    }
  }
  /**
* logs to user if success saving url
* @param {string} realURL url to log
*/
  function logSuccess(realURL) {
    setTimeout( async (realURL) => {
      ctx.reply(realURL, keyboard,
          {reply_to_message_id: message});
    }, Math.random()*30 + 1, realURL);
  };
};
