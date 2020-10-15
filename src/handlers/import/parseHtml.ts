/* eslint-disable no-invalid-this */
import cheerio from 'cheerio';
import {DateTime} from 'luxon';
export interface ExportPost {
  link: string,
  timeAdded: string|undefined
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
function parseDate(timeString: string|undefined): string|undefined {
  const timeNum = Number(timeString);
  const convertedDate = DateTime.fromMillis(timeNum);
  const stringDate = convertedDate.toISODate().toString();
  return stringDate;
}
