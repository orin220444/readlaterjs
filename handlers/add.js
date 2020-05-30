const {
  finder,
  saveToDB,
  axios,
} = require('../helpers');
const parse = require('../parse');


module.exports = async (ctx) => {
  // const message = await ctx.message.message_id;
  // console.log(ctx.message.caption_entities);
//  const answer = await ctx.reply('ишу ссылки');
  try {
    await finder(ctx.message).then( async (urls) => {
      let i = 0;
      if (urls !== 'no urls!') {
        //        ctx.deleteMessage(answer.message_id);
        for (i in urls) {
          if ({}.hasOwnProperty.call(urls, i)) {
            const url = urls[i];
            if (url !== 'message.chat.id') {
              console.log(url);
              try {
                const x = Math.random()*15 + 1;
                console.log(`x = ${x}`);
                setTimeout( async (url) => {
                  const data = await axios(url);
                  const realURL = data.realURL;
                  const page = data.page;
                  await parse(realURL, page);
                  console.log('sending url to the db');
                  await saveToDB(realURL);


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
      }
    });
  } catch (error) {
    console.log(error);
  }
};
