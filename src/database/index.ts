import {MongooseDocument} from 'mongoose';
import {Post} from './models.js';
/**
 * gets random post from the db
 * @return {Promise<object>} random post
 */
async function getRandomPost(): Promise<unknown> {
  try {
    const post = Post.count(async (err: Error, count: number):Promise<unknown>=> {
      if (err) throw new Error(`error while finding random post: ${error.message}`);
      const randomPost:number = Math.floor(Math.random() * count );
      const post = await Post.findOne().skip(randomPost);
      return post;
    });
    return post;
  } catch (error) {
  // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'error'. Did you mean 'Error'?
  } throw new Error(`error while finding random post: ${error.message}`);
}
/**
 * searches post by a part of text
 * @param {string} request from user
 */
async function partialSearch(request: unknown):Promise<unknown> {
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
async function getAllPosts():Promise<Array<undefined>> {
  const data = await Post.find();
  const posts = getPostsInJson(data);
  return posts;
}
/**
 * because mongoose returns data in document format needs to convert to object
 * @param {Array} data - mongoose documents
 * @return {Array} - mongoose data in json
 * */
function getPostsInJson(data: Array<MongooseDocument>): Array<undefined> {
  return data.map(function(item: MongooseDocument):undefined {
    return item.toJSON();
  });
}

export {getRandomPost, partialSearch, getAllPosts};
