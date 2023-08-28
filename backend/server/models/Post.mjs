import mongoose from 'mongoose';

const postScheme = mongoose.Schema({
  MusicalEntity: {
    Type: {
      type: String,
      required: true,
    },
    Id: {
      type: String,
      required: true,
    },
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