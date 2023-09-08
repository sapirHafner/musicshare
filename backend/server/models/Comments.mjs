import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    comments: {
        Type: [commentsSchema],
        default: [],
        required: true
    }
});

const commentsSchema = mongoose.Schema({
    postId: {
        type: String,
        required: true
    },

    comments: {
        type: [commentSchema],
        default:[],
        required: true
    }
  })

export default mongoose.model("Comments", commentsSchema);