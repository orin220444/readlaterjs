import {Telegraph} from 'telegraph-node';
async function newAccount() {
  const ph = new Telegraph();
  const result = await ph.createAccount('save for later bot');
  console.log(result);
}
