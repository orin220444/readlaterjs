const {
  finder,
  saveToDB,
  axios,
} = require('../helpers');
const keyboard = require('../helpers/keyboard.js');
module.exports = async (ctx) => {
  try {
    const urls = await finder(ctx.message);
    if (urls !== 'no urls!') {
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        if (url !== 'message.chat.id') {
          console.log(url);
          try {
            const x = Math.random()*15 + 1;
            console.log(`x = ${x}`);
            setTimeout( async (url) => {
              await axios(url).then(async (realURL) => {
                console.log('sending url to the db');
                await saveToDB(realURL);
              });
            }, x, url);
          } catch (error) {
            console.log(error);
          }
        }
        ctx.reply(url, keyboard);
      }
    };
  } catch (error) {
    console.log(error);
  }
};
