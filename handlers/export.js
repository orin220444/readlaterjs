import {Post} from '../database/models.js';
import jsoncsv from 'json-csv';
import {promisify} from 'util';
const buffered = promisify(jsoncsv.buffered);
import {writeFile} from 'fs';
const createFile = promisify(writeFile);
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
  buffered(posts, options).then((csv) => createFile('export.csv', csv)
      .then(sendToUser()),
  );


  /**
   * send document to user
   */
  function sendToUser() {
    ctx.replyWithDocument({source: 'export.csv'},
    );
  }
};
