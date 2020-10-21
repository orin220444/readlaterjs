import mongoose from 'mongoose';
import * as luxon from 'luxon';
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/mongoose-random` if it exi... Remove this comment to see the full error message
import random from 'mongoose-random';
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/mongoose-fuzzy-searching` ... Remove this comment to see the full error message
import mongooseFuzzySearching from 'mongoose-fuzzy-searching';
if(!process.env.MONGODB_URL){
throw new Error('does not key Mongodb url in .env file!')
}
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
    default: luxon.DateTime.local().toString(),
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
