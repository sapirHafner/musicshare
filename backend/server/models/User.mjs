import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model("User", UserSchema);
