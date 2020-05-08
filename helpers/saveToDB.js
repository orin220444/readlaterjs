const Post = require('../database/models');
/**
* saves url in the database
* @param {string} url - url to save
* @param {object} page - title and content of the page
*/
async function saveToDB(url, page) {
  const post = await Post.findOne({originalURL: url});
  if (!post) {
    try {
      const post = await Post.create({
        originalURL: url,
        title: page.title,
        content: page.content,
      });
      await post.save();
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = saveToDB;
// FIXME: сохраняет оригинальные и сокращенные ссылки
