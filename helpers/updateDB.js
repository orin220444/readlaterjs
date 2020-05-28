const Post = require('../database/models.js');
const fs = require('fs');
/**
 * saves local cache of the db to disk
 */
async function updateDb() {
  let posts = await Post.find();
  posts = JSON.stringify(posts);
  fs.writeFile('database.json', String(posts), function(err) {
    if (err) console.log(`update db error: ${err}`);
    else console.log('local cache updated!');
  });
}
module.exports = updateDb;
