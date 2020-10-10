// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/postlight__mercury-parser`... Remove this comment to see the full error message
import Mercury from '@postlight/mercury-parser';
/**
* parses web page to text
* @param {string} url url of web page to parse
* @return {Promise<{
  title:string, content:string}>} -
  web page title and web page content
*/
export async function parse(url: any) {
  // TODO: refactor
  try {
    const page = await Mercury.parse(url, {contentType: 'text'})
        .then((result: any) => {
          console.log(result.content);
          return {title: result.title, content: result.content};
        });
    return page;
  } catch (error) {
    throw new Error(error);
  }
}
