import {Post} from '../database/models.js';
import jsonCsv from 'json-csv';
import {promisify} from 'util';
const buffered = promisify(jsonCsv.buffered);
import {writeFile} from 'fs';
import {sendLog} from '../src/log.js';
const createFile = promisify(writeFile);
export const handleExport = async (ctx) => {
  console.log('getting posts to export');
  Post.find()
      .then((posts) => {
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
        buffered(posts, options)
            .then((csv) => createFile('export.csv', csv))
            .then(() => sendToUser())
            .catch((error) => sendLog(error));
      });

  /**
   * send document to user
   */
  function sendToUser() {
    ctx.replyWithDocument({source: 'export.csv'},
    );
  }
};
