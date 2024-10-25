import { Schema, model } from 'mongoose';

const EventSchema = new Schema([
    {
        name: {
            type: String,
            required: true
        }
    },
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
        max_round: {
            type: Number,
            required: true
        }
    },
    {
        round: {
            type: Number,
            default: 0,
        }
    },
    {
        status: {
            type: String,
            enum:["pending", "active", "donas"],
            default: "pending",
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