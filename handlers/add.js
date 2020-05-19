const {
  finder,
  saveToDB,
  axios,
} = require('../helpers');
// const parse = require('../helpers/parse');


module.exports = async (ctx) => {
  // const message = await ctx.message.message_id;
  // console.log(ctx.message.caption_entities);
//  const answer = await ctx.reply('ишу ссылки');
  try {
    await finder(ctx.message).then( async (urls) => {
      if (urls !== 'no urls!') {
        //        ctx.deleteMessage(answer.message_id);
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

                // ctx.telegram.editMessageText(
                // ctx.chat.id, answer.message_id)
                // 'отправляю ссылки на сервер');
              }, x, url);
            } catch (error) {
              console.log(error);
            }
          }
        }
        // parse(url);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
