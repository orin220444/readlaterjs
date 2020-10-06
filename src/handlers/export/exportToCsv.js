import jsonCsv from 'json-csv';
import {promisify} from 'util';
const buffered = promisify(jsonCsv.buffered);
/**
 * export data about posts in csv
 * @param {array} posts - mongoose data in json
 * @return {string} - csv document to export
 */
export async function exportToCsv(posts) {
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
  const csv = await buffered(posts, options);
  return csv;
}
