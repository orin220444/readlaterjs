const Post = require( '../database/models.js');
const jsoncsv = require('json-csv');
const fs = require('fs');
module.exports = async (ctx) => {
  console.log('getting posts to export');
  const posts = await Post.find();
  console.log('converting');
  const options = {fields: [
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
  jsoncsv.buffered(posts, options, (err, csv) => {
    if (err) console.log(err);
    else {
      sendToUser(csv);
      fs.writeFile('test.txt', csv, (err) => {
        if (err) console.log(err);
      });
    }
  });

  // console.log(test)
  /**
   * send document to user
   * @param {string} csv
   */
  function sendToUser(csv) {
    ctx.telegram.sendDocument({
      source: csv,
    });
  }
};
