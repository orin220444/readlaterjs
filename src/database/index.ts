import {Post} from './models.js';
/**
 * gets random post from the db
 * @return {Promise<object>} random post
 */
async function getRandomPost(): Promise<object> {
  try {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'findRandom' does not exist on type 'Mode... Remove this comment to see the full error message
    const post = await Post.findRandom().limit(1);
    return post[0];
  } catch (error) {
  // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'error'. Did you mean 'Error'?
  } throw new Error(`error while finding random post: ${error}`);
}
/**
 * searches post by a part of text
 * @param {string} request from user
 */
async function partialSearch(request: any) {
  try {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'fuzzySearch' does not exist on type 'Mod... Remove this comment to see the full error message
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
function getPostsInJson(data: any): Array<any> {
  return data.map(function(item: any) {
    return item.toJSON();
  });
}

export {getRandomPost, partialSearch, getAllPosts};
