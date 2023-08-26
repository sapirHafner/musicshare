import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  AlbumId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Song", SongSchema);