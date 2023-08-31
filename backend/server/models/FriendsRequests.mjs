import mongoose from 'mongoose';

const friendRequestScheme = mongoose.Schema({
    UserId: {
        type: String,
        required: true,
      },

      RequestUserIds: {
        type: Array,
        required: true,
      },
  })

export default mongoose.model("FriendRequestScheme", friendRequestScheme);



