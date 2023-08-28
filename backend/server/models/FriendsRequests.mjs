import mongoose from 'mongoose';

const friendApplicationScheme = mongoose.Schema({
    UserId: {
        type: String,
        required: true,
      },

      RequestUserIds: {
        type: Array,
        required: true,
      },
  })

export default mongoose.model("FriendApplicationScheme", friendApplicationScheme);



