const Post = require( '../database/models.js');
const jsoncsv = require('json-csv');
const fs = require('fs');
module.exports = async (ctx) => {
  console.log('getting posts to export');
  const posts = await Post.find();
  console.log('converting');
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
  jsoncsv.buffered(posts, options, (err, csv) => {
    if (err) console.log(err);
    else {
      fs.writeFile('export.csv', csv, (err) => {
        if (err) console.log(err);
        sendToUser(csv);
      });
    }
  });
  /**
   * send document to user
   * @param {string} csv
   */
  function sendToUser(csv) {
    ctx.replyWithDocument({source: 'export.csv'},
    );
  }
};
