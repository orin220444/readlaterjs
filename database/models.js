import mongoose from 'mongoose';
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
const userSchema = new Schema({
id: {
unique: true,
type: Number,
required: true}
username: {
type: String}
})
const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema)
export {Post, User};
