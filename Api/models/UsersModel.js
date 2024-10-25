import { Schema, model } from 'mongoose';

const UserSchema = new Schema([
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
        password: {
            type: String,
            required: true
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
            enum: ["admin", "judge", "participant"],
            lowercase: true,
            required: true
        }
    }
]);

export const UserModel = model("user", UserSchema);