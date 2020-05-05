const finder = require('../helpers/linkfinder');
// const parse = require('../helpers/parse');
const saveToDB = require('../helpers/saveToDB');
module.exports = async(ctx) => {
  // const message = await ctx.message.message_id;
  // console.log(ctx.message.caption_entities);
//  ctx.reply('ишу ссылки');
  try {
    await finder(ctx.message).then( async (urls) => {
      let i = 0;
      console.log(urls);
      if (urls === 'no urls!') {} else {
        for (i in urls) {
          if ({}.hasOwnProperty.call(urls, i)) {
            const url = urls[i];
            if (url == undefined) {

            } if (url == 'message.chat.id') {
            } else {
              console.log(url);
              try {
                await saveToDB(url);
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
}
