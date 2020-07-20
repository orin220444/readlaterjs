import {Post} from '../database/models.js';
import jsoncsv from 'json-csv';
const buffered = jsoncsv.buffered;
import fs from 'fs';
export default async (ctx) => {
  console.log('getting posts to export');
  const posts = await Post.find();
  console.log('converting');
  const options = {
    fields: [
      {
        name: 'originalURL',
        label: 'URL',
        quoted: true,
      },
      {
        name: 'asReaded',
        label: 'Read',
      },
      {
        name: 'created',
        label: 'created',
      },
    ]};
  buffered(posts, options, (err, csv) => {
    if (err) console.log(err);
    else {
      fs.writeFile('export.csv', csv, (err) => {
        if (err) console.log(err);
        sendToUser();
      });
    }
  });
  /**
   * send document to user
   */
  function sendToUser() {
    ctx.replyWithDocument({source: 'export.csv'},
    );
  }
};
