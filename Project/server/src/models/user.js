import { mongoose, Schema, model, Types } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    otp: {
        code: {
            type: String,
        },
        expiresAt: {
            type: Date,
        },
    },
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Blog",
        },
    ],
}, { timestamps: true });

userSchema.virtual('username').get(function () {
    return `${this.firstName}_${this.lastName}`.toLowerCase();
});

const User = model('User', userSchema);
export default User;
