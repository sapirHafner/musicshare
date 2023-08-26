import mongoose from 'mongoose';

const AlbumSchema = new mongoose.Schema({
    ArtistId: {
      type: String,
      required: true,
    },
    Name: {
        type: String,
        required: true,
      },
    SongIds: {
        type: Array,
        required: true,
      },
});

export default mongoose.model("Album", AlbumSchema);