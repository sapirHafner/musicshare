import mongoose from 'mongoose';

const postScheme = mongoose.Schema({
  musicalEntity: {
    type: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  userId: {
    type: String,
    required: true,
  },
  title: {
      type: String,
      required: true,
      maxlength: 40,
  },
  content: {
      type: String,
      required: true,
      maxlength: 300,
  },
  createdAt: {
      type: Date,
      required: true
  },
})

export default mongoose.model("Post", postScheme);