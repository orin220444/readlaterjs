import cheerio from 'cheerio';
/**
 * export data about posts in html
 * @param {array} posts - mongoose data in json
 * @return {string} - html document to export
 */
export function exportToHtml(posts: any) {
  const startHtmlpage = startHtml();
  const $ = cheerio.load(
      startHtmlpage);
  posts.forEach(function(post: any) {
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
