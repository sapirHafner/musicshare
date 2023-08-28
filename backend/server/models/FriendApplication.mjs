import mongoose from 'mongoose';

const friendApplicationScheme = mongoose.Schema({
    UserId: {
        type: String,
        required: true,
      },

      Friends: {
        type: Array,
        required: true,
      },
  })

export default mongoose.model("FriendApplicationScheme", friendApplicationScheme);



