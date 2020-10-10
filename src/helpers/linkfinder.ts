/**
* finds links and urls in message
* @param {any} message - telegram message
* @callback
* @return {string} url from the message
*/
function finder(message: any):Array<string>|string {
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
function url(entity: any, text: any): string {
  return text.substr(entity.offset, entity.length);
}
/**
* gets links in the "text_link" entities
* @param {object} entity - text_link entity
* @return {string} url
*/
function textLink(entity: any): string {
  return entity.url;
}
/**
* finds urls in the entities field of the message
* @param {array} entities - message entities
* @param {string} text - message text
* @return {array} array of the urls
*/
function find(entities: any, text: any): Array<string> {
  const urls:Array<string> = [];
  for (const entity of entities) {
    if (entity.type == 'text_link') {
      urls.push(textLink(entity));
    }
    if (entity.type == 'url') {
      urls.push(url(entity, text));
    }
  }
  return urls;
}

export {finder};


// TODO: delete user messages
