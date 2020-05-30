module.exports = ($) => {
  const title = $('h1.article__header_title').text();
  const article = $('article.article__content, text').text();
  return {title: title, article: article};
};
