const axios = require('axios')
const cheerio = require('cheerio')
async function parse(url){
console.log("test")
    axios.get(url).then(function(response){
        //console.log(response)
const $ = cheerio.load(response)
body = $("body").text()
console.log(body)
    })
.catch(funtion(error){
console.log("error:", error)
})
}
module.exports = parse
