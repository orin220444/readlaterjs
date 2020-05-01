/**
* finds links and urls in message
* @param {any} message telegram message
* @return {string} url from the message
*/
async function finder(message) {
  if (message.entities) {
    const urls = find(message.entities, message.text);
    console.log(urls);
    return urls;
  }
  if (message.caption_entities) {
    const urls = find(message.caption_entities, message.caption);
    console.log(urls);
    return urls;
  } else {
    return 'no urls!';
  }
}

/**
* filters types of the entities
* @param {array} entities - message.entities or message.caption_entities
* @param {string} neededType - type to filter
* @return {array} filtered entities
*/
function filter(entities, neededType) {
  // console.log(neededType);
  const filteredentities = [];
  for (let i = 0; i < entities.length; i++) {
    // console.log(entities[i].type);
    if (entities[i].type == neededType) {
      filteredentities.push(entities[i]);
    }
  }
  return filteredentities;
}
/**
* gets links in the "url" entities
* @param {array} urlentities - url entities
* @param {string} text - message.text or message.caption
* @return {array} array of the urls
*/
function url(urlentities, text) {
  // console.log(text);
  const urls = [];
  for (let i = 0; i < urlentities.length; i++) {
    const url = text.substr(urlentities[i].offset, urlentities[i].length);
    urls.push(url);
  }
  return urls;
}
/**
* gets links in the "text_link" entities
* @param {array} linkentities - text_link entities
* @return {array} array of entities
*/
function textLink(linkentities) {
  const urls = [];
  for (let i = 0; i < linkentities.length; i++) {
    const url = linkentities[i].url;
    urls.push(url);
  }
  return urls;
}
/**
* finds urls in the entities field of the message
* @param {array} entities - message entities
* @param {string} text - message text
* @return {array} array of the urls arrays
*/
function find(entities, text) {
  const linkentity = filter(entities, 'text_link');
  const urlentity = filter(entities, 'url');
  const linkurls = textLink(linkentity);
  const urlurls = url(urlentity, text);
  return [linkurls, urlurls];
}
module.exports = finder;


// TODO: delete user messages
