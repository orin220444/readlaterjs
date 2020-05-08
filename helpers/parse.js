const Mercury = require('@postlight/mercury-parser')
/**
* parses web page to text
* @param {string} url url of web page to parse
*/
async function parse(url) {
Mercury.parse(url,{contentType: "markdown"}).then(result => {
console.log(result.content)
})
}
module.exports = parse;
