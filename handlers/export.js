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
    const posts = getPostsInJson(data);
    const exportData = exportToHtml(posts);
    const fileExt = '.html';
    createFile(`export${fileExt}`, exportData).then(() => sendToUser(fileExt))
        .catch((error) => sendLog(error));
    /**
   * send document to user
   * @param {string} fileExt - extension of file to export
   */
    async function sendToUser(fileExt) {
      await ctx.replyWithDocument({source: `export${fileExt}`},
      );
    }
  });
};
/**
 * because mongoose returns data in document format needs to convert to object
 * @param {Array} data - mongoose documents
 * @return {Array} - mongoose data in json
 * */
function getPostsInJson(data) {
  return data.map(function(item) {
    return item.toJSON();
  });
}
/**
 * export data about posts in html
 * @param {array} posts - mongoose data in json
 * @return {string} - html document to export
 */
function exportToHtml(posts) {
  const nameHtml = '<h1>Export from readlaterbot</h1>';
  const unreadHtml = '<h1>Unread</h1>\n<ul id=Unread></ul>\n';
  const readArchive = '<h1>Read Archive</h1>\n<ul id=links></ul>';
  const startHtml =
  `${nameHtml}\n ${unreadHtml} ${readArchive}\n`;

  const $ = cheerio.load(
      startHtml);
  posts.forEach(function(post) {
  // console.log(post.originalUrl ? post.originalUrl: post.originalURL)
    const url = post.originalUrl ? post.originalUrl: post.originalURL;
    const title = post.title ? post.title : url;
    const listName =
    (post.read = false) || (post.asReaded = false) ? '#Unread': '#links';

    $(listName).append(
        `<li><a href="${url}">${title}</a></li>\n`,
    );
  });
  // TODO: remove attributes
  const html = $.html();
  console.log(html);
  return html;
}
