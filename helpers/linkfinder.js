/**
* finds links and urls in message
* @param {any} message telegram message
* @return {string} url from the message
*/
async function finder(message) {
  if (message.entities) {
    const entities = message.entities;
    const linkentity = entities.filter((item) => item.type == 'text_link');
    const urlentity = entities.filter((item) => item.type == 'url');
    const urls = [];
    if (linkentity) {
      let i = 0;
      let url = ' ';
      while (i < linkentity.length) {
        url = linkentity[i].url;
        urls.push(url);
        i++;
      }
    }
    if (urlentity) {
      let i = 0;
      let url = ' ';
      const text = message.text;
      while (i < urlentity.length) {
        start = urlentity[i].offset;
        end = urlentity[i].offset + urlentity[i].length;
        url = text.substring(start, end);
        urls.push(url);
        i++;
      }
      return urls;
    } else {
      return 'no urls!';
    }
  }
  if (message.photo) {
    console.log(message);
    const entities = message.caption_entities;
    console.log('entities', entities);
    const linkentity = entities.filter((item) => item.type == 'text_link');
    const urlentity = entities.filter((item) => item.type == 'url');
    const urls = [];
    if (linkentity) {
      let i = 0;
      let url = ' ';
      while (i < linkentity.length) {
        url = linkentity[i].url;
        i++;
        urls.push(url);
      }
    }
    if (urlentity) {
      let i = 0;
      let url = ' ';
      const text = message.caption;
      while (i < urlentity.length) {
        start = urlentity[i].offset;
        end = urlentity[i].offset + urlentity[i].length;
        url = text.substring(start, end);
        urls.push(url);
        i++;
      }
      console.log(urls);
      return urls;
    } else {
      return 'no urls!';
    }
  }
};
module.exports = finder;


// TODO: delete user messages
