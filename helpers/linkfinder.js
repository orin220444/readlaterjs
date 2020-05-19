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
  } else if (message.caption_entities) {
    const urls = find(message.caption_entities, message.caption);
    console.log(urls);
    return urls;
  } else {
    return 'no urls!';
  }
}

/**
* gets links in the "url" entities
* @param {object} entity - url entity
* @param {string} text - message.text or message.caption
* @return {string} url
*/
function url(entity, text) {
  const url = text.substr(entity.offset, entity.length);
  return url;
}
/**
* gets links in the "text_link" entities
* @param {object} entity - text_link entity
* @return {string} url
*/
function textLink(entity) {
  const url = entity.url;
  return url;
}
/**
* finds urls in the entities field of the message
* @param {array} entities - message entities
* @param {string} text - message text
* @return {array} array of the urls
*/
function find(entities, text) {
  const urls = [];
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    if (entity.type == 'text_link') {
      urls.push(textLink(entity));
    }
    if (entity.type == 'url') {
      urls.push(url(entity, text));
    }
  }
  return urls;
}
module.exports = finder;


// TODO: delete user messages
