import {keyboard} from '../helpers/keyboard.js';
import {random} from '../helpers/random.js';
import {sendLog} from '../src/log.js';
import {getAllPosts} from '../database/index.js';
import threadsPool from 'node-worker-threads-pool';
const StaticPool = threadsPool.StaticPool;
import {cpus} from 'os';
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
  const pool = new StaticPool({
    size: cpus().length,
    task: './handlers/nonReadPosts.js',
    workerData: 'workerData!',
  });
  /**
   * send random non read post to user
   * @return {object} post from the db
   * @param {callback} callback
   */
  async function getPost(callback) {
    getAllPosts(async function(data) {
      const posts = await pool.exec(data);
      const randomPost = random(posts);
      callback( randomPost);
    });
  }
};
