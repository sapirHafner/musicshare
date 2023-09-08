import mongoose from 'mongoose';

const friendsRequestsScheme = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  requestsUserIds: {
    type: Array,
    required: true,
  },
})

export default mongoose.model("FriendsRequests", friendsRequestsScheme);



