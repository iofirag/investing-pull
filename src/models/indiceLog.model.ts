import { Document, Schema, Model, model } from 'mongoose';
import { CollectionsNames } from "../utils/consts";


export interface IIndiceLogDoc extends Document {
    technicalSummary: any,
    indiceId: any
    updated?: any,
}

export const IndiceLogSchema: Schema = new Schema<IIndiceLogDoc>({
    technicalSummary: { type: Object },
    indiceId: { type: Schema.Types.ObjectId, ref: CollectionsNames.INDICE},
    updated: { type: Date, default: Date.now },
}, 
{ collection: CollectionsNames.INDICE_LOG });

/* pre functions */
IndiceLogSchema.pre<IIndiceLogDoc>('save', async function(next) {
    try {
        // Use any model controller for doing some stuff before save this document
        next()
    } catch(ex) {
        return next(ex);
    }
});

export const IndiceLogModel: Model<IIndiceLogDoc> = model<IIndiceLogDoc>(CollectionsNames.INDICE_LOG, IndiceLogSchema);
