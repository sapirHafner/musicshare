import mongoose from 'mongoose';

const AlbumSchema = new mongoose.Schema({
  artistId: {
    type: String,
    required: true,
  },
  name: {
      type: String,
      required: true,
  },
  songsIds: {
      type: Array,
      required: true,
  },
  imageUrl: {
    type: String
  }
});

export default mongoose.model("Album", AlbumSchema);