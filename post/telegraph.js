import Telegraph from 'telegraph-node';

const ph = new Telegraph();
const token = process.env.TELEGRAPH_TOKEN;

/**
 * save post as a telegraph page
 * @param {string} title
 * @param {string} content
 */
export async function telegraph(page) {
  try {
    const telegraphPage = await ph.createPage(token, page.title, page.content);
    return telegraphPage;
  } catch (error) {
    console.log(error);
  };
}
