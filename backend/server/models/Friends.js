const mongoose = require("mongoose");

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

const Friends = mongoose.model("Friends", FriendsSchema);

module.exports = Friends;
