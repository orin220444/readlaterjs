/**
* finds links and urls in message
* @param {any} message - telegram message
* @callback
* @return {string} url from the message
*/
import {Context} from 'telegraf';
type Message = Context['message'];
export type Url = string
export type ArrayUrl = Array<Url>
export const finder = (message:Message):ArrayUrl|undefined => {
  if (message) {
    if (message.entities) {
      if (message.text) {
        const urls = find(message.entities, message.text);
        console.log(urls);
        return urls;
      }
    } else if (message.caption_entities) {
      if (message.caption) {
        const urls = find(message.caption_entities, message.caption);
        console.log(urls);
        return urls;
      }
    }
  }
};

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
function find(entities: any, text: string): Array<string> {
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


// TODO: delete user messages
