import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        body: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            default: "",
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;