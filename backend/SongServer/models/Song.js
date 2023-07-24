const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
});

const Song = mongoose.model("Song", SongSchema);

module.exports = Song;
