import { Schema, model } from 'mongoose';

const EventSchema = new Schema([
    {
        metrics: [
            {
                description: {
                    type: String,
                    required: true
                },
                max_points: {
                    type: Number,
                    required: true
                }
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
        status: {
            type: String,
            enum:["pending", "active", "donas"],
            lowercase: true,
            required: true
        }
    },
    {
        groups: []
    },
    {
        judges: []
    }
])

export const EventModel = model("event", EventSchema)

// type:Schema.Types.ObjectId