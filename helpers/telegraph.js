const Telegraph = require('telegraph-node');
const ph = new Telegraph();
ph.createAccount('save for later').then((result) => {
  console.log(result);
});
async function telegraph(url) {
}
module.exports = telegraph;
