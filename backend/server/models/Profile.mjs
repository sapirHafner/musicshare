import mongoose from 'mongoose';

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

export default mongoose.model("Profile", ProfileScema);