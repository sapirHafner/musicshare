import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
      type: String,
      required: true,
  },
  email: {
    type: String,
    required: true
  },
  albumsIds: {
      type: Array,
      required: true,
  },
});

export default mongoose.model("Artist", artistSchema);