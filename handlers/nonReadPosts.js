import {parentPort, workerData} from 'worker_threads';
/**
   * filters non read posts
   * @param {object} data - data from database
   * @return {object} non read posts
   */
parentPort.on('message', (data) => {
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
  console.log('workerData is', workerData);
  parentPort.postMessage(posts);
});
