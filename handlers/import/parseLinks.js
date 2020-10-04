import cheerio from 'cheerio';
/**
 * parses links from pocket export file
 * @param {string} Html HTML page
 * @return {Array} links
 */
export function parseLinks(Html) {
  const $ = cheerio.load(html);
  const links = [];
  $('a').each(function() {
    const link = $(this).attr('href');
    links.push(link);
  });
  return links;
}
