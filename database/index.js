import Post from './models.js';
/** finds post in the db
 * @param {string} url of post to find
*/
async function search(url) {
  return await Post.find(url);
}
export {search};
