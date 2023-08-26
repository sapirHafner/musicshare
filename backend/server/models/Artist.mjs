import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
    UserId: {
      type: String,
      required: true,
    },
    Name: {
        type: String,
        required: true,
      },
    Email: {
      type: String,
      required: true
    },
    AlbumsIds: {
        type: Array,
        required: true,
      },
});

export default mongoose.model("Artist", artistSchema);