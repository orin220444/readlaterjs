import mongoose from 'mongoose';
import {DateTime} from 'luxon';
import random from 'mongoose-random';
import mongooseFuzzySearching from 'mongoose-fuzzy-searching';
const mongoUrl = process.env.MONGODB_URL;
if (!mongoUrl) {
  throw new Error('does not key Mongodb url in .env file!');
}
await mongoose.connect(mongoUrl, {
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
    default: DateTime.local().toString(),
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
postSchema.plugin(random);
postSchema.plugin(mongooseFuzzySearching, {fields: ['originalUrl']});
const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);
export {Post, User};
