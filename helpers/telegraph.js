import Telegraph from 'telegraph-node';
const ph = new Telegraph();
ph.createAccount('save for later').then((result) => {
  console.log(result);
});
const token = process.env.TELEGRAPH_TOKEN;
/**
 * save post as a telegraph page
 * @param {string} title
 * @param {string} content
 */
export async function telegraph(title, content) {
  ph.createPage(token, title, content).then((result) => console.log(result),
  );
}
