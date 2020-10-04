import {getAllPosts} from '../database/index.js';
import {promisify} from 'util';
import cheerio from 'cheerio';
import {writeFile} from 'fs';
const createFile = promisify(writeFile);
export const handleExport = async (ctx) => {
  console.log('getting posts to export');
  getAllPosts(function(posts) {
    console.log('converting');

    /**
 * export data about posts in html
 * @param {array} posts - mongoose data in json
 * @return {string} - html document to export
 */
    function exportToHtml(posts) {
      const startHtmlpage = startHtml();
      const $ = cheerio.load(
          startHtmlpage);
      posts.forEach(function(post) {
        // console.log(post.originalUrl ? post.originalUrl: post.originalURL)
        const url = post.originalUrl ? post.originalUrl: post.originalURL;
        const title = post.title ? post.title : url;
        const listName =
      (post.read === false) || (post.asReaded === false) ? '#Unread': '#links';
        const time = `${Date.parse(post.created)}`;
        $(listName).append(
            `<li><a href="${url}" time_added="${time}">${title}</a></li>\n`,
        );
      });
      // TODO: remove attributes
      const html = $.html();
      console.log(html);
      return html;
    }
    /**
 * create start html page
 * @return {string} html page
 */
    function startHtml() {
      const nameHtml = '<h1>Export from readlaterbot</h1>';
      const unreadHtml = '<h1>Unread</h1>\n<ul id=Unread></ul>\n';
      const readArchive = '<h1>Read Archive</h1>\n<ul id=links></ul>';
      return `${nameHtml}\n ${unreadHtml} ${readArchive}\n`;
    }

    createFile('export.html', exportToHtml(posts)).then(sendToUser());


    /**
   * send document to user
   */
    function sendToUser() {
      ctx.replyWithDocument({source: 'export.html'},
      );
    }
  });
};
