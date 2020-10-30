/* eslint-disable no-invalid-this */
import cheerio from 'cheerio';
import {DateTime} from 'luxon';
import {Url} from '../../helpers/linkfinder.js';
export interface ExportPost {
  link: Url,
  timeAdded?: string
}
/**
 * parses links from pocket export file
 * @param {string} html HTML page
 * @return {Array} posts: links + time added
 */
export function parseHtml(html: string):Array<ExportPost> {
  const $ = cheerio.load(html);

  const posts: Array<ExportPost> = [];
  $('a').each(() => {
    const timeAdded = $(this).attr('time_added');
    const link = $(this).attr('href');
    if (link) {
      const post: ExportPost = {
        link: link,
        timeAdded: parseDate(timeAdded),
      };
      posts.push(post);
      console.log(post);
    }
  });
  return posts;
}
/**
 *
 * @param {string} timeString - parsed time from cheerio in unix
 * @return {string} date in iso format
 */
function parseDate(timeString?: string): string|undefined {
  const timeNum = Number(timeString);
  const convertedDate = DateTime.fromSeconds(timeNum);
  const stringDate = convertedDate.toISODate().toString();
  return stringDate;
}
