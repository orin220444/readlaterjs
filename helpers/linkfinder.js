/**
* finds links and urls in message
* @param {any} message telegram message
* @return {string} url from the message
*/
async function finder(message) {
  if (message.entities) {
    const entities = message.entities;
    const linkentity = filter(entities, 'text_link');
    const urlentity = filter(entities, 'url');
    const urls = [];
    if (linkentity) {
      urls.concat(textLink(linkentity));
      console.log(urls);
    // return urls
    }
    if (urlentity) {
      urls.concat(url(urlentity, message.text));
      console.log(urls);
    // return urls
    }
    console.log(urls);
    return urls;
  }
  if (message.caption_entities) {
    const entities = await message.caption_entities;
    const linkentity = filter(entities, 'text_link');
    const urlentitiy = filter(entities, 'url');

    const urls = [];
    if (linkentity) {
      const urls = textLink(linkentity);
      console.log(urls);
      return urls;
    } if (urlentitiy) {
      const urls = url(urlentitiy, message.caption);
      console.log(urls);
      return urls;
    }
  } else {
    return 'no urls!';
  }
}

function filter(entities, neededType) {
  console.log(neededType);
  const filteredentities = [];
  for (let i = 0; i < entities.length; i++) {
    console.log(entities[i].type);
    if (entities[i].type == neededType) {
      filteredentities.push(entities[i]);
    }
  }
  return filteredentities;
}
function url(urlentities, text) {
  console.log(text);
  const urls = [];
  for (let i = 0; i < urlentities.length; i++) {
    const url = text.substr(urlentities[i].offset, urlentities[i].length);
    urls.push(url);
  }
  return urls;
}
function textLink(linkentities) {
  const urls = [];
  for (let i = 0; i < linkentities.length; i++) {
    const url = linkentities[i].url;
    urls.push(url);
  }
  return urls;
}
module.exports = finder;


// TODO: delete user messages
