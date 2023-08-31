import mongoose from 'mongoose';

const followersSchema = new mongoose.Schema({
    artistId: {
      type: String,
      required: true,
    },
    followers: {
        type: Array,
        required: true,
    },
});

export default mongoose.model("followers", followersSchema);