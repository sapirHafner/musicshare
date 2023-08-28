import mongoose from 'mongoose';

const postScheme = mongoose.Schema({
    MusicalEntity: {
      type: Object,
      required: true,
    },
    UserId: {
      type: String,
      required: true,
    },
    Title: {
        type: String,
        required: true,
    },
    Content: {
        type: String,
        required: true,
    },
    CreatedAt: {
        type: Date,
        required: true
    },
  })

export default mongoose.model("Post", postScheme);