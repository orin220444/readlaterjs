import {buffered} from 'json-csv';
import {promisify} from 'util';
const buffer = promisify(buffered);
/**
 * export data about posts in csv
 * @param {array} posts - mongoose data in json
 * @return {string} - csv document to export
 */
export async function exportToCsv(posts: any):Promise<string> {
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
  const csv = await buffer(posts, options);
  return csv;
}
