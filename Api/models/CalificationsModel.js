import { Schema, model } from 'mongoose';

const CalificationsSchema = new Schema([
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        event: {
            type: Schema.Types.ObjectId,
            ref: 'event',
            required: true
        },
        round: {
            type: Number,
            required: true
        },
        scores: [
            {
                metric: {
                    type: Schema.Types.ObjectId,
                    ref: 'event',
                    required: true
                },
                score: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
]);

export const CalificationsModel = model('calification', CalificationsSchema);