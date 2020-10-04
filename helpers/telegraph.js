import Telegraph from 'telegraph-node';
const ph = new Telegraph();
ph.createAccount('save for later bot').then((result) => {
  console.log(result);
});
