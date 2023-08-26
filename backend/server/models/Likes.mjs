import mongoose from 'mongoose';

const LikesSchema = new mongoose.Schema({
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
  UsersIds: {
    type: Array,
    required: true,
  },
});

export default mongoose.model("Likes", LikesSchema);