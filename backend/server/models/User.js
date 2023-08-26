const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Type: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;