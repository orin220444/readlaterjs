const finder = require('./linkfinder');
const saveToDB = require('./saveToDB');
const parse = require('./parse');
const axios = require('./axios');
module.exports = {
  finder,
  saveToDB,
  axios,
  parse,
};
