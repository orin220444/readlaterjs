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
      for (i = 0; i < linkentity.length; i++) {
        url = linkentity[i].url;
        urls.push(url);
      }
    }
    if (urlentity) {
      let i = 0;
      let url = ' ';
      const text = message.text;
      for (i=0; i<urlentity.length; i++) {
        start = urlentity[i].offset;
        length = urlentity[i].length;
        url = text.substr(start, length);
        urls.push(url);
      }

      return urls;
    } else {
      return 'no urls!';
    }
  }
  if (message.caption) {
    console.log(message);
    const entities = message.caption_entities;
    console.log('entities', typeof entities);
    const linkentity = [];
    for (i=0; i< entities.length; i++) {
      if (entities[i].type == 'text_link') {
        linkentity.push(entitites[i]);
      }
    }
    const urlentity = [];
    for (i=0; i< entities.length; i++) {
      if (entities[i].type == 'url') {
        urlentity.push(entities[i]);
      }
    }
    const urls = [];
    if (linkentity) {
      let i = 0;
      let url = ' ';
      for (i=0; i<linkentity.length; i++) {
        url = linkentity[i].url;
        urls.push(url);
      }
    }

    if (urlentity) {
      let i = 0;
      let url = ' ';
      const text = message.caption;
      for (i=0; i<urlentity.length; i++) {
        start = urlentity[i].offset;
        length = urlentity[i].length;
        url = text.substr(start, length);
        urls.push(url);
      }
    }
    console.log(urls);
    if (urls) {
      return urls;
      //      } else {
      //      return 'no urls!';
    }
  }
  if (message.reply_markup) {
    console.log(message.reply_markup);
  }
};

module.exports = finder;


// TODO: delete user messages
