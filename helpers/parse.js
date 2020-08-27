const Mercury = require('@postlight/mercury-parser');
/**
* parses web page to text
* @param {string} url url of web page to parse
* @return {object} web page title and web page content
*/
async function parse(url) {
  // TODO: refactor
  try {
    const page = await Mercury.parse(url, {contentType: 'text'})
        .then((result) => {
          console.log(result.content);
          return {title: result.title, content: result.content};
        });
    return page;
  } catch (error) {
    throw new Error(error);
  }
}
export {parse};
