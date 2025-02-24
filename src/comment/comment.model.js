import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: [true, 'Comment content is required'],
            maxLength: [500, `Comment can't exceed 500 characters`]
        },
        publication: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: [true, 'Post reference is required']
        }
    },
    { timestamps: true }
);

export default model("Comment", commentSchema);
