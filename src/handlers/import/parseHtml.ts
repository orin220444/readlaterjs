/* eslint-disable no-invalid-this */
import cheerio from 'cheerio';
import {DateTime} from 'luxon';
/**
 * parses links from pocket export file
 * @param {string} html HTML page
 * @return {Array} posts: links + time added
 */
export function parseHtml(html: any) {
  const $ = cheerio.load(html);
  const posts: any = [];
  $('a').each(function() {
    // @ts-expect-error ts-migrate(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    const timeAdded = $(this).attr('time_added');
    /** @typedef {object} ExportPost
     * @property {string} link - link of a post
     * @property {string} timeAdded - time stamp parsed from time_added field
     */
    /** @type {ExportPost} */
    const post = {
      // @ts-expect-error ts-migrate(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
      link: $(this).attr('href'),
      timeAdded: parseDate(timeAdded),
    };
    posts.push(post);
    console.log(post);
  });
  return posts;
}
/**
 *
 * @param {string} timeString - parsed time from cheerio in unix
 * @return {string} date in iso format
 */
function parseDate(timeString: any) {
  const timeNum = Number(timeString);
  const convertedDate = DateTime.fromMillis(timeNum);
  const stringDate = convertedDate.toISODate().toString();
  return stringDate;
}
