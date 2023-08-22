const mongoose = require("mongoose");

const LikesSchema = new mongoose.Schema({
  ObjectId: {
    type: String,
    required: true,
  },
  UsersIds: {
    type: Array,
    required: true,
  },
});

const Likes = mongoose.model("Likes", LikesSchema);

module.exports = Likes;
