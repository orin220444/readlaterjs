async function finder(message) {
  if (message.entities) {
    const entities = message.entities;
    const linkentity = entities.filter((item) => item.type == 'text_link');
    const urlentity = entities.filter((item) => item.type == 'url');
    if (linkentity) {
      let i = 0;
      let url = ' ';
      while (i < linkentity.length) {
        url = linkentity[i].url;
        i++;
        return url
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
        return url
        i++;
      }
    } else {
      return 'no urls!';
    }
  }
  if (message.photo) {
    const entities = message.caption_entities;
    const linkentity = entities.filter((item) => item.type == 'text_link');
    const urlentity = entities.filter((item) => item.type == 'url');
    if (linkentity) {
      let i = 0;
      let url = ' ';
      while (i < linkentity.length) {
        url = linkentity[i].url;
        i++;
        return url
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
        return url
        i++;
      }
    } else {
      return 'no urls!';
    }
  }
};
module.exports = finder;


// TODO: delete user messages
