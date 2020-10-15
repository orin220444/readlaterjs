import {Schema, Document} from 'mongoose';
declare module 'mongoose-fuzzy-searching' {
    export interface SearchDocument extends Document {
        fieldFuzzy: Array<string>;

        fuzzySearch(model: SearchDocument):
        Promise<Array<RandomDocument>>|Promise<RandomDocument>;
    }
    export default function(schema: Schema<unknown>):unknown;
}
