import mongoose from 'mongoose';

const FriendsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  friends: {
    type: Array,
    required: true,
  },
});

export default mongoose.model("Friends", FriendsSchema);