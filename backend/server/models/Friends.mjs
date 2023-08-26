import mongoose from 'mongoose';

const FriendsSchema = new mongoose.Schema({
  UserId: {
    type: String,
    required: true,
  },

  Friends: {
    type: Array,
    required: true,
  },
});

export default mongoose.model("Friends", FriendsSchema);