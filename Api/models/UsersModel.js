import { Schema, model } from 'mongoose';

const UsersSchema = new Schema([
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        email: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        curp: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        rol: {
            type: String,
            enum: ["admin", "judge", "user"],
            lowercase: true,
            required: true
        }
    }
]);

export const UsersMoel = model("user", UsersSchema);