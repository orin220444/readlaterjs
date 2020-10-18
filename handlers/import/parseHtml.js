import cheerio from 'cheerio';
import {DateTime} from 'luxon';
/**
 * parses links from pocket export file
 * @param {string} html HTML page
 * @return {Array} posts: links + time added
 */
export function parseHtml(html) {
  const $ = cheerio.load(html);
  const posts = [];
  $('a').each(function() {
    const post = {};
    post.link = $(this).attr('href');
    let timeAdded = $(this).attr('time_added');
    timeAdded = Number(timeAdded);
    timeAdded = DateTime.fromSeconds(timeAdded);
    post.timeAdded = timeAdded.toString();
    posts.push(post);
    console.log(post);
  });
  return posts;
}
