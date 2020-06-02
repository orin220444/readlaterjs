const {
  finder,
  saveToDB,
  axios,
  keyboard,
} = require('../helpers');
module.exports = async (ctx) => {
  try {
    await finder(ctx.message, function(urls) {
      ;
      if (urls !== 'no urls!') {
        for (let i = 0; i < urls.length; i++) {
          const url = urls[i];
          if (url !== 'message.chat.id') {
            console.log(url);
            try {
              const x = Math.random()*15 + 1;
              console.log(`x = ${x}`);
              setTimeout( async (url) => {
                await axios(url, async function(realURL) {
                  console.log('sending url to the db');
                  await saveToDB(realURL);
                });
              }, x, url);
            } catch (error) {
              console.log(error);
            }
          }
          ctx.reply(url, keyboard,
              {reply_to_message_id: ctx.message.message_id});
        }
      };
    });
  } catch (error) {
    console.log(error);
  }
};
