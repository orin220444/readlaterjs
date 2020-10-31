import mongoose from 'mongoose';
import {DateTime} from 'luxon';
import mongooseRandom from 'mongoose-random';
import mongooseFuzzySearching from 'mongoose-fuzzy-searching';
import {getModelForClass, prop, plugin} from '@typegoose/typegoose';
const mongoUrl = process.env.MONGODB_URL;
if (!mongoUrl) {
  throw new Error('does not key Mongodb url in .env file!');
}
await mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
@plugin(mongooseFuzzySearching, {fields: ['originalUrl']})
@plugin(mongooseRandom)
class PostClass {
    @prop()
    OriginaUrl:string
    @prop()
    redirectUrl:string
    @prop()
    parsedUrl:string
    @prop()
    read:boolean
    @prop()
    title:string
    @prop()
    content:string
    @prop()
    created:DateTime
}
export const PostModel = getModelForClass(PostClass);
const Schema = mongoose.Schema;
const userSchema = new Schema({
  id: {
    unique: true,
    type: Number,
    required: true},
  username: {
    type: String},
});
const User = mongoose.model('User', userSchema);
export {User};
