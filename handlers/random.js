import {keyboard} from '../helpers/keyboard.js';
import {random} from '../helpers/random.js';
import {sendLog} from '../src/log.js';
import {getAllPosts} from '../database/index.js';
export const handleRandom = async (ctx) => {
  getPost(function(randomPost) {
    sendLog(`Random post: ${randomPost.originalURL}`);
    try {
      ctx.reply(
          randomPost.originalURL, keyboard,
          {reply_to_message_id: ctx.message.message_id});
    } catch (error) {
      sendLog(error);
    }
  });

  /**
   * filters non read posts
   * @param {object} data - data from database
   * @return {object} non read posts
   */
  function nonReadPosts(data) {
    const posts = [];
    for (let i = 0; i < data.length; i++) {
      const post = data[i];
      if (post.asReaded === false) {
        posts.push(post);
      }
      if (!post.asReaded) {
        posts.push(post);
      }
    }
    return posts;
  }
  /**
   * send random non read post to user
   * @return {object} post from the db
   * @param {callback} callback
   */
  async function getPost(callback) {
    getAllPosts(function(data) {
      const posts = nonReadPosts(data);
      const randomPost = random(posts);
      callback( randomPost);
    });
  }
};
