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
        length = urlentity[i].length;
        url = text.substr(start, length);
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
    const entities = await message.caption_entities;
    console.log('entities', typeof entities);
    const linkentity = [];
    // entities.filter((item) => item.type == 'text_link');
    for (i in entities) {
      if ([i].type == 'text_link') {
        linkentity.push([i]);
      }
    }
    const urlentity = [];
    for ([i] in entities) {
      if ([i].type == 'url') {
        urlentity.push([i]);
      }
    } // entities.filter((item) => item.type == 'url');
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
        length = urlentity[i].length;
        url = text.substr(start, length);
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
