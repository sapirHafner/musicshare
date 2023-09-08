import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  albumId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Song", SongSchema);