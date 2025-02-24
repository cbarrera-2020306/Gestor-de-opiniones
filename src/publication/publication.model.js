import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxLength: [100, `Title can't exceed 100 characters`]
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        content: {
            type: String,
            required: [true, 'Content is required']
        },
        authorname: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false
        }
    },
    { timestamps: true }
);

export default model("Post", postSchema);
