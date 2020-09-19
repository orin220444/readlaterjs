import {Post} from './models.js';
/** finds post in the db
 * @param {string} url of post to find
*/
async function search(url) {
  const data = await Post.find(url, callback);
  callback(getPostsInJson(data));
}
/**
 * get all posts from db
 * @param {callback} callback
 */
async function getAllPosts(callback) {
  const data = await Post.find();
  callback(getPostsInJson(data));
}
function getPostsInJson(data) {
  return data.map(function(item) {
    return item.toJSON();
  });
}
export {search, getAllPosts};
