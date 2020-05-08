const Post = require('../database/models');
const parse = require('../helpers/parse');
/**
 * some tests to delete trash, fix data
 */
async function mainten() {
  const posts = await Post.find();
  for (let i=0; i < posts.length; i++) {
    const post = posts[i];
    await deleteDuplicates(post);
    // await deleteJPEG(post)
  }
}
module.exports = mainten;
/* function deleteJPEG(posts) {
  console.log(post);
}*/
/**
 * checks for the duplicates in the db and deletes them
 * @param {object} post post from the db
 */
async function deleteDuplicates(post) {
  const realUrl = await parse.getRealurl(post.originalURL);
  const posts = await Post.find(realUrl);
  console.log(posts);
}
