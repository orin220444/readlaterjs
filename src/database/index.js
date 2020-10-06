import {Post} from './models.js';
/**
 * gets random post from the db
 * @return {object} random post
 */
async function getRandomPost() {
  try {
    // @ts-ignore
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
    // @ts-ignore
    const data = await Post.fuzzySearch(request);
    return data;
  } catch (error) {
    throw new Error(`error while searching: ${error}`);
  }
}
/**
 * gets all posts from db
 */
async function getAllPosts() {
  const data = await Post.find();
  const posts = getPostsInJson(data);
  return posts;
}
/**
 * because mongoose returns data in document format needs to convert to object
 * @param {Array} data - mongoose documents
 * @return {Array} - mongoose data in json
 * */
function getPostsInJson(data) {
  return data.map(function(item) {
    return item.toJSON();
  });
}

export {getRandomPost, partialSearch, getAllPosts};
