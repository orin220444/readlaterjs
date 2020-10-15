import {Schema, Document} from 'mongoose';
declare module 'mongoose-random' {
    export interface RandomDocument extends Document {
        random: {
            type:string,
            coordinates: Array<number>
        };
        findRandom(model: RandomDocument):
        Promise<Array<RandomDocument>>|Promise<RandomDocument>;
        limit(quantity:number):Promise<RandomDocument>;
    }
    export default function(schema: Schema<unknown>):unknown;
}
