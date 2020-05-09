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
  asReaded: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
