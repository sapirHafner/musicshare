const mongoose = require("mongoose");

const ProfileScema = new mongoose.Schema({
  UserId: {
    type: String,
    required: true,
  },

  FirstName: {
    type: String,
    required: true,
  },

  LastName: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },
});

const Profile = mongoose.model("Profile", ProfileScema);

module.exports = Profile;
