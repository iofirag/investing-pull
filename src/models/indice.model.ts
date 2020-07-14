import { Document, Schema, Model, model } from 'mongoose';
import { CollectionsNames } from "../utils/consts";


export interface IIndice extends Document {
    name: string,
    link: any,
    updated: Date,
}

const IndiceSchema: Schema = new Schema<IIndice>({
    name: { type: String },
    link: { type: String },
    updated: { type: Date, default: Date.now },
},
{ collection: CollectionsNames.INDICE });

/* pre functions */
IndiceSchema.pre<IIndice>('save', async function(next) {
    try {
        // Use any model controller for doing some stuff before save this document
        next()
    } catch(ex) {
        return next(ex);
    }
});

export const IndiceModel: Model<IIndice> = model<IIndice>(CollectionsNames.INDICE, IndiceSchema);
