/**
* finds links and urls in message
* @param {any} message telegram message
* @return {string} url from the message
*/
async function finder(message) {
  console.log(message);
  if (message.entities) {
    const entities = message.entities;
    console.log(entities);
    const linkentity = [];
    for (i in entities) {
      if ({}.hasOwnProperty.call(entities, [i])) {
        if (entities[i].type == 'text_link') {
          linkentity.push(entities[i]);
        }
      }
    }

    const urlentity = [];
    for (i in entities) {
      if ({}.hasOwnProperty.call(entities, [i])) {
        ;
        if (entities[i].type == 'url') {
          urlentity.push(entities[i]);
        }
      }
    }
    console.log(linkentity, urlentity);
    const urls = [];
    if (linkentity) {
      let i = 0;
      let url = ' ';
      for (i in linkentity) {
        if ({}.hasOwnProperty.call(linkentity, [i])) {
          url = linkentity[i].url;
          urls.push(url);
        }
      }
    }
    if (urlentity) {
      let i = 0;
      let url = ' ';
      const text = message.text;
      for (i in urlentity) {
        if ({}.hasOwnProperty.call(urlentity, [i])) {
          start = urlentity[i].offset;
          length = urlentity[i].length;
          url = text.substr(start, length);
          urls.push(url);
        }
      }
      return urls;
    } else {
      return 'no urls!';
    }
  }
  if (message.caption_entities) {
    console.log(message);
    const entities = await message.caption_entities;
    console.log('entities', typeof entities);
    const linkentity = [];
    // entities.filter((item) => item.type == 'text_link');
    for (i in entities) {
      if (entities[i].type == 'text_link') {
        linkentity.push(entities[i]);
      }
    }
    const urlentity = [];
    for (i in entities) {
      if (entities[i].type == 'url') {
        urlentity.push(entities[i]);
      }
    } // entities.filter((item) => item.type == 'url');
    const urls = [];
    if (linkentity) {
      let i = 0;
      let url = ' ';
      for (i in linkentity) {
        if ({}.hasOwnProperty.call(urls, [i])) {
          url = linkentity[i].url;
          urls.push(url);
        }
      }
    }
    if (urlentity) {
      let i = 0;
      let url = ' ';
      const text = message.caption;
      for (i in urlentity) {
        if ({}.hasOwnProperty.call(urls, [i])) {
          start = urlentity[i].offset;
          length = urlentity[i].length;
          url = text.substr(start, length);
          urls.push(url);
        }
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
