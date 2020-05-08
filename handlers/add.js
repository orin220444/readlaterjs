const finder = require('../helpers/linkfinder');
const parse = require('../helpers/parse');
const saveToDB = require('../helpers/saveToDB');
module.exports = async (ctx) => {
  // const message = await ctx.message.message_id;
  // console.log(ctx.message.caption_entities);
//  const answer = await ctx.reply('ишу ссылки');
  try {
    await finder(ctx.message).then( async (urls) => {
      let i = 0;
      console.log(urls);
      if (urls === 'no urls!') {
        //        ctx.deleteMessage(answer.message_id);
      } else {
        for (i in urls) {
          if ({}.hasOwnProperty.call(urls, i)) {
            const url = urls[i];
            if (url == undefined) {

            } if (url == 'message.chat.id') {
            } else {
              console.log(url);
              try {
                // ctx.telegram.editMessageText(ctx.chat.id, answer.message_id,
                // 'отправляю ссылки на сервер');
                const page = await parse(url);
                console.log(page);
                await saveToDB(url);
              } catch (error) {
                console.log(error);
              }
            }
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};
