const Post = require('../database/models.js');
const fs = require('fs');
/**
 * saves local cache of the db to disk
 */
async function updateDb() {
  let posts = await Post.find();
  posts = JSON.stringify(posts);
  fs.writeFileSync('database.json', String(posts));
  console.log('local cache updated!');
}
module.exports = updateDb;
