import {MongooseDocument} from 'mongoose';
import {Post} from './models.js';
/**
 * gets random post from the db
 * @return {Promise<object>} random post
 */
async function getRandomPost<T>(): Promise<T> {
  try {
    const post = await Post.findRandom().limit(1);
    return post[0];
  } catch (error:Error) {
  // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'error'. Did you mean 'Error'?
  } throw new Error(`error while finding random post: ${error.message}`);
}
/**
 * searches post by a part of text
 * @param {string} request from user
 */
async function partialSearch<T, Y>(request: T):Promise<Y> {
  try {
    const data = await Post.fuzzySearch(request);
    return data;
  } catch (error) {
    throw new Error(`error while searching: ${error}`);
  }
}
/**
 * gets all posts from db
 */
async function getAllPosts<T>():Promise<Array<T>> {
  const data = await Post.find();
  const posts = getPostsInJson(data);
  return posts;
}
/**
 * because mongoose returns data in document format needs to convert to object
 * @param {Array} data - mongoose documents
 * @return {Array} - mongoose data in json
 * */
function getPostsInJson<T>(data: Array<MongooseDocument>): Array<T> {
  return data.map(function(item: MongooseDocument):undefined {
    return item.toJSON();
  });
}

export {getRandomPost, partialSearch, getAllPosts};
