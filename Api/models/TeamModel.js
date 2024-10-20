import { Schema, model } from 'mongoose';

const TeamSchema = new Schema([
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        leader: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        round: {
            type: Number,
            required: true
        }
    },
    {
        califications: [
            {
                type: Schema.Types.ObjectId,
                ref: 'calification'
            }
        ]
    }
]);

export const TeamModel = model("team", TeamSchema);