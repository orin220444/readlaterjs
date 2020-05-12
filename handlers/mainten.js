const Post = require('../database/models');
const getRealUrl = require('../helpers/getRealUrl');
module.exports = async () => {
  const posts = await Post.find();
  const length = posts.length;
  for (let i = 0; i < length; i++) {
    const post = posts[i];
    // console.log(post);
    console.log(`checking for duplicates for post ${post.originalURL}`);
    try {
      await checkForDuplicates(post);
    } catch (error) {
      console.log(error);
    }
  }
};
/**
 * checks for the duplicates because of shotten urls and redirect urls
 * @param {object} post post to check
 */
async function checkForDuplicates(post) {
  const realUrl = setTimeout(async (post) => {
    const realurl = await getRealUrl(post.originalURL);
    return realurl;
  }, 15*1000, post);
  if (realUrl !== undefined) {
    if (realUrl !== post.originalURL) {
      const original = Post.findOne({originalURL: realUrl});
      if (original !== undefined) {
        if (original === post) {
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
}
