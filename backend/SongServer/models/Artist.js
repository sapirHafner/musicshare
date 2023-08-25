const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    UserId: {
      type: String,
      required: true,
    },
    Name: {
        type: String,
        required: true,
      },
    Email: {
      type: String,
      required: true
    },
    Albums: {
        type: Array,
        required: true,
      },
});




const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
