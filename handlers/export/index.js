import {Post} from '../../database/models.js';
// import jsonCsv from 'json-csv';
import {promisify} from 'util';
import {exportToHtml} from './exportToHtml.js';
// const buffered = promisify(jsonCsv.buffered);
import {writeFile} from 'fs';
import {sendLog} from '../../src/log.js';
const createFile = promisify(writeFile);
export const handleExport = async (ctx) => {
  console.log('getting posts to export');
  Post.find().then((data)=> {
    const posts = getPostsInJson(data);
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
/**
 * because mongoose returns data in document format needs to convert to object
 * @param {Array} data - mongoose documents
 * @return {Array} - mongoose data in json
 * */
function getPostsInJson(data) {
  return data.map(function(item) {
    return item.toJSON();
  });
}
