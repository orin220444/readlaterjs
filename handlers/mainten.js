import Post from '../database/models';
import {urlCheck} from '../helpers/axios.js';

export const handleMainten = async () => {
  const posts = await Post.find();
  for (const post of posts) {
    console.log(`checking for duplicates for post ${post.originalURL}`);
    try {
      await checkForDuplicates(post, posts);
    } catch (error) {
      console.log(error);
    }
  }
};
/**
 * checks for the duplicates because of shotten urls and redirect urls
 * @param {object} post post to
 * @param {object} posts posts from the db
 */
async function checkForDuplicates(post, posts) {
  const realUrl = await urlCheck(post.originalURL);
  // TODO: add try ... catch
  if (realUrl !== undefined) {
    if (realUrl !== post.originalURL) {
      // TODO: combine checks
      const original = findOriginal(post.originalURL);
      if (original !== undefined) {
        if (original) {
          console.log('finded a duplicate!');
          await Post.findOneAndDelete({originalURL: post.originalURL});
          console.log('duplicate is deleted!');
        } else {
          console.log('updating url');
          console.log(post);
          post.originalURL = await realUrl;
          await post.save();
        }
      }
    }
  }
  /**
   * checks is a current url in the db
   * @param {string} url url to find
   * @return {boolean} exists or not
   */
  function findOriginal(url) {
    // TODO: refactor
    for (let i = 0; i < posts.length; i++) {
      const postURL = posts[i].originalURL;
      if (postURL === url) {
        return true;
      } else {
        return false;
      }
    }
  }
}
