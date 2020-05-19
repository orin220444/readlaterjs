const finder = require('./linkfinder');
const saveToDB = require('./saveToDB');
const getRealURL = require('./getRealUrl');
const parse = require('./parse')
module.exports = {
  finder,
  saveToDB,
  getRealURL,
  parse,
};
