import {Post} from './models.js';
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
export {getRandomPost, partialSearch};
