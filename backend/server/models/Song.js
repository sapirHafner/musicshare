const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Album: {
    type: String,
    required: true,
  },
  Artist: {
    type: String,
    required: true,
  },
  Length: {
    type: Number,
    required: true,
  },
});

const Song = mongoose.model("Song", SongSchema);

module.exports = Song;
