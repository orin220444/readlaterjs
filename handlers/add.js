const {
  finder,
  saveToDB,
  getRealURL,
} = require('../helpers');
// const parse = require('../helpers/parse');


module.exports = async (ctx) => {
  // const message = await ctx.message.message_id;
  // console.log(ctx.message.caption_entities);
//  const answer = await ctx.reply('ишу ссылки');
  try {
    await finder(ctx.message).then( async (urls) => {
      let i = 0;
      if (urls === 'no urls!') {
        //        ctx.deleteMessage(answer.message_id);
      } else {
        for (i in urls) {
          if ({}.hasOwnProperty.call(urls, i)) {
            const url = urls[i];
            if (url === undefined) {

            } if (url === 'message.chat.id') {
            } else {
              console.log(url);
              try {
                const realURL = await getRealURL(url);
                // ctx.telegram.editMessageText(ctx.chat.id, answer.message_id,
                // 'отправляю ссылки на сервер');
                console.log('sending url to the db');
                await saveToDB(realURL);
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
