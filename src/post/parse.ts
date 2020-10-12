// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/postlight__mercury-parser`... Remove this comment to see the full error message
import Mercury from '@postlight/mercury-parser';

export interface ParsedData {
  title: string,
  content: string
}
/**
* parses web page to text
* @param {string} url url of web page to parse
* -
  web page title and web page content
*/
export async function parse(url: string): Promise<ParsedData> {
  // TODO: refactor
  try {
    const data = await Mercury.parse(url, {contentType: 'text'});

        const page:ParsedData = {
          title: data.title,
          content: data.content,
    };
    return page;
  } catch (error) {
    throw new Error(error);
  }
}
