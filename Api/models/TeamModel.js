import { Schema, model } from 'mongoose';

const TeamSchema = new Schema([
    {
        id_team: {
            type: Schema.Types.ObjectId
        },
    },
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        id_members: []
    },
    {
        leader: [
            {
                type: Schema.Types.ObjectId,
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
        grades: []
    }
]);

export const TeamModel = model("team", TeamSchema);