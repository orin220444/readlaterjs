import {getModelForClass} from '@typegoose/typegoose';
import {prop} from '@typegoose/typegoose';
import {DateTime} from 'luxon';
import {plugin} from '@typegoose/typegoose';
import mongooseFuzzySearching from 'mongoose-fuzzy-searching';
import mongooserandom from 'mongoose-random';
@plugin(mongooseFuzzySearching, {fields: ['originalUrl']})
@plugin(mongooserandom)
class PostClass {
    @prop()
    public OriginaUrl:string
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
export const Post = getModelForClass(PostClass);
