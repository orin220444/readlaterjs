import {Post} from './models.js';
/**
 * gets random post from the db
 * @return {object} random post
 */
async function getRandomPost() {
  try {
    const post = await Post.findRandom().limit(1);
    return post[0];
  } catch (error) {
  } throw new Error(`error while finding random post: ${error}`);
}
/**
 * searches post by a part of text
 * @param {string} request from user
 */
async function partialSearch(request) {
  try {
    const data = await Post.fuzzySearch(request);
    return data;
  } catch (error) {
    throw new Error(`error while searching: ${error}`);
  }
}
export {getRandomPost, partialSearch};
