const axios = require('axios')
const cheerio = require('cheerio')
async function parse(url){
    axios.get(url).then(function(response){
        const $ = cheerio.load(response)
    })
}
module.exports = parse
