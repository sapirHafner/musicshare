import mongoose from "mongoose";
import Friends from "../models/Friends.mjs";
import User from "../models/User.mjs";
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');


export const getFriendsRecommendationForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userFriends = await Friends.findOne({UserId: userId});
        const userFriendsAndCurrentUser = userFriends.Friends.concat([userId]);
        const userFriendsAndCurrentUserIds = userFriendsAndCurrentUser.map(id => new mongoose.Types.ObjectId(id));
        const recommendedProfiles = await User.aggregate([
            { $match: {Type: "user"}},
            { $match: { _id: { $nin: userFriendsAndCurrentUserIds } } },
            { $sample: { size: 5 } }
        ])
        const recommendedProfilesIds = recommendedProfiles.map(recommendedProfile => recommendedProfile._id)
        res.status(200).send(recommendedProfilesIds);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

