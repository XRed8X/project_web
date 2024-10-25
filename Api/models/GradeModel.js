import { Schema, model } from 'mongoose';

const GradesSchema = new Schema([
    {
        id_group: {
            type: Schema.Types.ObjectId,
            required: true
        },
        id_event: {
            type: Schema.Types.ObjectId,
            required: true
        },
        round: {
            type: Number,
            required: true
        },
        scores: [
            {
                id_metric: {
                    type: Schema.Types.ObjectId,
                    required: true
                },
                score: {
                    type: Number,
                    required: true
                },
                id_judge: {
                    type: Schema.Types.ObjectId,
                    required: true
                }
            }
        ]
    }
]);

export const GradesModel = model('grades', GradesSchema);