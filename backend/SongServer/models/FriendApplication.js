const mongoose = require('mongoose');

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

  const friendApplication = mongoose.model("FriendApplicationScheme", friendApplicationScheme);

  module.exports = friendApplicationScheme;


