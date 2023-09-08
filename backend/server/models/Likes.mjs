import mongoose from 'mongoose';

const LikesSchema = new mongoose.Schema({
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
  usersIds: {
    type: Array,
    required: true,
  },
});

export default mongoose.model("Likes", LikesSchema);