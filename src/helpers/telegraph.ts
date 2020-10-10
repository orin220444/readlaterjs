// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/telegraph-node` if it exis... Remove this comment to see the full error message
import Telegraph from 'telegraph-node';
const ph = new Telegraph();
ph.createAccount('save for later bot').then((result: any) => {
  console.log(result);
});
