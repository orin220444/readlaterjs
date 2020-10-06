/**
 * gets random value from array
 * @param {Array<any>} array
 * @return {any} random value
 */
export function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}
