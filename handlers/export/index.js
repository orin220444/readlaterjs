import {getAllPosts} from '../../database/index.js';
// import jsonCsv from 'json-csv';
import {promisify} from 'util';
import {exportToHtml} from './exportToHtml.js';
// const buffered = promisify(jsonCsv.buffered);
import {writeFile} from 'fs';
import {sendLog} from '../../src/log.js';
const createFile = promisify(writeFile);
export const handleExport = async (ctx) => {
  console.log('getting posts to export');
  getAllPosts().then((posts)=> {
    const exportData = exportToHtml(posts);
    const fileExt = '.html';
    createFile(`export${fileExt}`, exportData).then(() => sendToUser(fileExt))
        .catch((error) => sendLog(error));
    /**
   * send document to user
   * @param {string} fileExt - extension of file to export
   */
    async function sendToUser(fileExt) {
      await ctx.replyWithDocument({source: `export${fileExt}`},
      );
    }
  });
};
