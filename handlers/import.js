const bot = require('../bot');
const axios = require('axios');
const fs =require('fs');
module.exports = async (ctx) => {
  ctx.reply('send a file');
  bot.on('message', async (ctx) => {
    console.log(ctx.message);
    const file = await ctx.telegram.getFileLink(ctx.message.document.file_id);
    console.log(file);
    axios.get(file)
        .then(function(response) {
          console.log(typeof response.data);
          fs.writeFileSync(
              `import${new Date().getSeconds()}.html`,
              response.data);
        });
  });
};
