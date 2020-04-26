const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const postSchema = new Schema({
  originalURL: {
    unique: true,
    type: String,
    required: true,
  },
  parsedURL: {
    type: String,
    default: '',
  },
});
const Post = mongoose.model('Post', postSchema);
module.exports = Post;