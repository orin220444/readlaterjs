import Telegraph from 'telegraph-node';
const ph = new Telegraph();
ph.createAccount('save for later').then((result) => {
  console.log(result);
});
