const mongoose = require('mongoose');

const postScheme = mongoose.Schema({
    MusicalObject: {
      type: Object,
      required: true,
    },
    UserId: {
      type: String,
      required: true,
    },
    Title: {
        type: String,
        required: true,
    },
    Content: {
        type: String,
        required: true,
    },
    Time: {
        type: Date,
        required: true
    },
  })

const Post = mongoose.model("Post", postScheme);

module.exports = Post;
