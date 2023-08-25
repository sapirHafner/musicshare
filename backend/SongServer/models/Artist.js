const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
      },

    Albums: {
        type: Array,
        required: true,
      },
});




const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
