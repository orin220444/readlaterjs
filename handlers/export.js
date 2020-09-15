import {Post} from '../database/models.js';
// import jsonCsv from 'json-csv';
import {promisify} from 'util';
import cheerio from 'cheerio';
// const buffered = promisify(jsonCsv.buffered);
import {writeFile} from 'fs';
import {sendLog} from '../src/log.js';
const createFile = promisify(writeFile);
export const handleExport = async (ctx) => {
  console.log('getting posts to export');
  Post.find().then((data)=> {
    const posts = getPostsInJSON(data);
    const $ = cheerio.load(
        '<h1>Export from readlaterbot</h1>\n <ul id=links>\n');
    posts.forEach(function(post) {
      // console.log(post.originalUrl ? post.originalUrl: post.originalURL)
      const url = post.originalUrl ? post.originalUrl: post.originalURL;
      const title = post.title ? post.title : url;
      $('#links').append(
          `<li><a href="${url}">${title}</a></li>\n`,
      );
    });

    const html = $.html();
    console.log(html);
    createFile('export.html', html).then(() => sendToUser())
        .catch((error) => sendLog(error));
    /**
   * send document to user
   */
    async function sendToUser() {
      await ctx.replyWithDocument({source: 'export.html'},
      );
    }
  });
};
function getPostsInJSON(data) {
  return data.map(function(item) {
    return item.toJSON();
  });
}
