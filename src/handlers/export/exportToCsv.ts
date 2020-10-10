// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/json-csv` if it exists or ... Remove this comment to see the full error message
import jsonCsv from 'json-csv';
import {promisify} from 'util';
const buffered = promisify(jsonCsv.buffered);
/**
 * export data about posts in csv
 * @param {array} posts - mongoose data in json
 * @return {string} - csv document to export
 */
export async function exportToCsv(posts: any) {
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
