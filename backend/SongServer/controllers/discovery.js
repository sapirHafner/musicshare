const { default: mongoose } = require("mongoose");
const Friends = require("../models/Friends");
const User = require("../models/User");

const getFriendsRecommendationForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userFriends = await Friends.findOne({UserId: userId});
        const userFriendsAndCurrentUser = userFriends.Friends.concat([userId]);
        const userFriendsAndCurrentUserIds = userFriendsAndCurrentUser.map(id => new mongoose.Types.ObjectId(id));
        const recommendedProfiles = await User.aggregate([
            { $match: { _id: { $nin: userFriendsAndCurrentUserIds } } },
            { $sample: { size: 5 } }
        ])
        const recommendedProfilesIds = recommendedProfiles.map(recommendedProfile => recommendedProfile._id)
        res.status(200).send(recommendedProfilesIds);
    } catch (error) {
        console.log(error)
        res.sendStatus(404);
    }
}

module.exports = { getFriendsRecommendationForUser };