import mongoose from 'mongoose';

const featureFlagSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    active: {
        type: Boolean,
        required: true
    },
});


export default mongoose.model("FeatureFlags", featureFlagSchema);