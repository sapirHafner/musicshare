import mongoose from "mongoose";
import Friends from "../models/Friends.mjs";
import FriendsRequests from '../models/FriendsRequests.mjs'
import User from "../models/User.mjs";

export const getFriendsRecommendationForUser = async (req, res) => {
    try {
        const undiscovarable = [req.params.userId];

        const userFriends = (await Friends.findOne({userId: req.params.userId})).friends;
        undiscovarable.push(...userFriends);

        const userSentFriendsRequests = (await FriendsRequests.find({requestsUserIds: {$in: req.params.userId}})).map(userFriendsRequest => userFriendsRequest.userId);
        undiscovarable.push(...userSentFriendsRequests);

        const undiscovarableIds = undiscovarable.map(id => new mongoose.Types.ObjectId(id));

        const recommendedProfiles = await User.aggregate([
            { $match: {type: "user"}},
            { $match: { _id: { $nin: undiscovarableIds } } },
            { $sample: { size: Number(req.query.size) } }
        ])
        const recommendedProfilesIds = recommendedProfiles.map(recommendedProfile => recommendedProfile._id)
        res.status(200).send(recommendedProfilesIds);
    } catch (error) {
        res.sendStatus(500);
    }
}

