import mongoose from 'mongoose';
import luxon from 'luxon';
import random from 'mongoose-random';
import mongooseFuzzySearching from 'mongoose-fuzzy-searching';
import idAssigner from 'mongoose-id-assigner';
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const postSchema = new Schema({
  originalUrl: {
    unique: true,
    type: String,
    required: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  parsedUrl: {
    type: String,
  },
  read: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  created: {
    type: Date,
    default: luxon.DateTime.local(),
  },
});
const userSchema = new Schema({
  id: {
    unique: true,
    type: Number,
    required: true},
  username: {
    type: String},
});
const options = {
  modelName: 'Post',
  fields: {
    id: '5555',
  },
};
postSchema.plugin(random);
postSchema.plugin(mongooseFuzzySearching, {fields: ['originalUrl']});
postSchema.plugin(idAssigner.plugin(options));
const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);
export {Post, User};
