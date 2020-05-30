const axios = require('./axios.js');
const finder = require('./linkfinder.js');
const saveToDB = require('./saveToDB.js');
const keyboard = require('./keyboard.js');
module.exports = {
  finder,
  saveToDB,
  axios,
  keyboard,
};
