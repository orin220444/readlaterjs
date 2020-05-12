const Post = require('../database/models');

const getRealUrl = require('../helpers/getRealUrl');
const updateDb = require('../helpers/updateDB');
module.exports = async () => {
  await updateDb();
  const posts = require('../database.json');
  const length = posts.length;
  for (let i = 0; i < length; i++) {
    const post = posts[i];
    // console.log(post);
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
  const x = Math.random()*15 + 1;
  const realUrl = setTimeout(async (post) => {
    console.log(post);
    const realurl = await getRealUrl(post.originalURL);
    return realurl;
  }, x, post);
  if (realUrl !== undefined) {
    if (realUrl !== post.originalURL) {
      const original = findOriginal(post.originalURL);
      if (original !== undefined) {
        if (original) {
          console.log('finded a duplicate!');
          setTimeout(async (post) => {
            await Post.findOneAndDelete({originalURL: post.originalURL});
          }, 10* 1000, post);
          console.log('duplicate is deleted!');
        } else {
          console.log('updating url');
          setTimeout( async (post, realUrl) => {
            console.log(post);
            post.originalURL = await realUrl;
            await post.save();
          }, 20* 1000, post, realUrl);
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
