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
                type: String,
                required: true
            }
        ]
    },
    {
        round: {
            type: Number,
            default: 0
        }
    },
    {
        grades: []
    }
]);

export const TeamModel = model("team", TeamSchema);