const Post = require('../database/models')
async function saveToDB(url){
    const post = await Post.findOne({originalURL: url})
    if(!post){
try {
    const post = await Post.create({
        originalURL: url
    })
    await post.save()
} catch(error){
console.log(error)
}
    }
}
module.exports = saveToDB
