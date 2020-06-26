import {writeFile} from 'fs';
/**
 * logging
 * @param {string} message to log
 */
export function sendLog(message) {
  console.log(message);
  writeFile('log.txt', message + '\n', {flag: 'a'}, function(err) {
    if (err) {
      console.log('failed to logging!');
    }
  });
}
