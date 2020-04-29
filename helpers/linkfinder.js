/**
* finds links and urls in message
* @param {any} message telegram message
* @return {string} url from the message
*/
async function finder(message) {
  if (message.entities) {
    const entities = message.entities;
    const linkentity = filter(entities,'text_link');
    const urlentity = filter(entities, 'url');
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
      const text = message.text;
      for (i in urlentity) {
        if ({}.hasOwnProperty.call(urls, [i])) {
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
function filter(entities, neededType){
  console.log(neededType)
  const filteredentities = [];
  for (let i = 0; i < entities.length; i++)  {
    if ([i].type == neededType) {
      filteredentities.push([i]);
    }
    return filteredentities
}
}
function url(urlentities){
let urls = []
  for (let i = 0; i < urlentities.length; i++) {
    const url = message.text.substr(urlentities[i].offset, urlentities[i].length);
    urls.push(url)
  }
  return urls
}
function text_link(linkentities){
  let urls = []
  for (let i = 0; i < linkentiites.length; i++) {
    const url = linkentities[i].url
    urls.push(url)
  }
  return urls
}
module.exports = finder;


// TODO: delete user messages
