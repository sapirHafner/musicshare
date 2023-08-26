import mongoose from 'mongoose';

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

export default mongoose.model("User", UserSchema);