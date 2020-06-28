const bot = require('../bot');
const axios = require('axios');
const fs = require('fs');
module.exports = async (ctx) => {
  ctx.reply('send a file');
  bot.on('message', async (ctx) => {
    const file = await ctx.telegram.getFileLink(ctx.message.document.file_id);
    axios.get(file)
        .then(function(response) {
        fs.writeFile(
              `import${new Date().getSeconds()}.html`,
              response.data, function(err) {
                if (err) console.log(`error while importing: ${err}`);
              });
        });
  });
};
