import {Post} from './models.js';
/** finds post in the db
 * @param {string} url of post to find
*/
async function search(url) {
  const data = await Post.find(url, callback);
  callback(data);
}
/**
 * get all posts from db
 * @param {callback} callback
 */
async function getAllPosts(callback) {
  const data = await Post.find();
  callback(data);
}
/**
 * gets random post from the db
 * @return {object} random post
 */
async function getRandomPost() {
  const post = await Post.findRandom().limit(1);
  return post[0];
}
/**
 * searches post by a part of text
 * @param {string} request from user
 */
async function partialSearch(request) {
  return await Post.fuzzySearch(request);
}
export {search, getAllPosts, getRandomPost, partialSearch};
