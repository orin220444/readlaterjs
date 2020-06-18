import Post from '../database/models.js';
import fs from 'fs';
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
export default updateDb;
