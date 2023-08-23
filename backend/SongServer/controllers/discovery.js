const Friends = require("../models/Friends");
const Profile = require("../models/Profile");
const User = require("../models/User");

const getFriendsRecommendationForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userFriends = await Friends.findOne({UserId: userId});
        const userFriendsAndCurrentUser = userFriends.Friends.concat([userId]);
        const recommendedProfiles = await User.aggregate([
            { $match: { _id: { $nin: userFriendsAndCurrentUser } } },
            { $sample: { size: 5 } }
        ])
        const recommendedProfilesIds = recommendedProfiles.map(recommendedProfile => recommendedProfile._id)
        res.status(200).send(recommendedProfilesIds);
    } catch {
        res.sendStatus(404);
    }
}

module.exports = { getFriendsRecommendationForUser };