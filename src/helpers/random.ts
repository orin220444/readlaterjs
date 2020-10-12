/* eslint-disable @typescript-eslint/no-unsafe-return */
/**
 * gets random value from array
 * @param {Array<any>} array
 * @return {any} random value
 */
export function random(array: Array<unknown>): unknown {
  return array[Math.floor(Math.random() * array.length)];
}
