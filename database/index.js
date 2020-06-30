import Post from './models.js';
/** finds post in the db
 * @param {string} url of post to find
*/
async function search(url) {
const data = await Post.find(url)
  callback(data);
}
async function getAllPosts(){
const data = await Post.find
callback(data)
}
export {search, getAllPosts};
