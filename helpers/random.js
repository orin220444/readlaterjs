/**
 * gets random value from array
 * @param {Array} array
 * @return {any} random value
 */
export default function(array) {
  return array[Math.floor(Math.random() * array.length)];
}
