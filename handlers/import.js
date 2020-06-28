const bot = require('../bot');
const axios = require('axios');
const fs = require('fs');
const html2Json = require('html2json')
async function getFile(ctx){
  ctx.reply('send a file');
  bot.on('message', async (ctx) => {
    const file = await ctx.telegram.getFileLink(ctx.message.document.file_id);
    axios.get(file)
        .then(function(response) {
exportPosts(response.data)/*
        fs.writeFile(
              `import${new Date().getSeconds()}.html`,
              response.data, function(err) {
                if (err) console.log(`error while importing: ${err}`);
else exportPosts()
              });*/
        });
  });
};

function exportPosts(exportHTML){
const export = html2json(exportHTML)
console.log(export)
}
module.exports(getFile)
