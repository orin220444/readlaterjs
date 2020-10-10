import {Post as PostModel} from '../database/models.js';
import {sendLog} from '../helpers/index.js';
// import {Post} from '../post.js';
export const handleMainten = async () => {
  const posts = await PostModel.find();
  for (const post of posts) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'originalUrl' does not exist on type 'Doc... Remove this comment to see the full error message
    sendLog(`checking for duplicates for post ${post.originalUrl}`);
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
async function checkForDuplicates(post: any, posts: any) {
  try {
    // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'Post'. Did you mean 'post'?
    const post = new Post();
    const realUrl = await post.urlCheck(post.originalUrl);
    if (realUrl !== post.originalUrl) {
      const isOriginal = findOriginal(post.originalUrl);
      if (isOriginal) {
        sendLog('finded a duplicate!');
        await PostModel.findOneAndDelete({originalUrl: post.originalUrl});
        sendLog('duplicate is deleted!');
      } else {
        sendLog('updating url');
        sendLog(post);
        post.originalUrl = await realUrl;
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
  function findOriginal(url: any) {
    for (const post of posts) {
      const postURL = post.originalUrl;
      if (postURL === url) return true;
    }
    return false;
  }
}
