import Post from '../database/models';
import {urlCheck} from '../helpers/axios.js';
import {sendLog} from '../src/log';

export const handleMainten = async () => {
  const posts = await Post.find();
  for (const post of posts) {
    sendLog(`checking for duplicates for post ${post.originalURL}`);
    try {
      await checkForDuplicates(post, posts);
    } catch (error) {
      sendLog(error);
    }
  }
};
/**
 * checks for the duplicates because of shotten urls and redirect urls
 * @param {object} post post to
 * @param {object} posts posts from the db
 */
async function checkForDuplicates(post, posts) {
  try {
    const realUrl = await urlCheck(post.originalURL);
    if (realUrl !== post.originalURL) {
      const isOriginal = findOriginal(post.originalURL);
      if (isOriginal) {
        sendLog('finded a duplicate!');
        await Post.findOneAndDelete({originalURL: post.originalURL});
        sendLog('duplicate is deleted!');
      } else {
        sendLog('updating url');
        sendLog(post);
        post.originalURL = await realUrl;
        await post.save();
      }
    }
  } catch (error) {
    sendLog(error);
  }
  /**
   * checks is a current url in the db
   * @param {string} url url to find
   * @return {boolean} exists or not
   */
  function findOriginal(url) {
    for (const post of posts) {
      const postURL = post.originalURL;
      if (postURL === url) return true;
    }
    return false;
  }
}
