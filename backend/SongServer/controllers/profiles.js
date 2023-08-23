const Profile = require("../models/Profile");

const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).send(profiles);
    } catch {
        res.sendStatus(400);
    }
}

const getProfileByUserId = async (req, res) => {
    try {
        const profile = await Profile.findOne({UserId: req.params.userId});
        res.status(200).send(profile);
    } catch {
        res.sendStatus(400);
    }
}

const addProfile = async (req, res) => {
    try {
        await Profile.create(req.body);
        res.sendStatus(200);
    } catch {
        res.sendStatus(404);
    }
}

const getUsersProfileBoxInfo = async (req, res) => {
    try {
        const userIds = req.params.userIds.split(',');
        const userBoxesInfo = await Promise.all(userIds.map(async userId => {
            const userProfile = await Profile.findOne({"UserId": userId});
            return {
                    UserId: userProfile.UserId,
                    FirstName: userProfile.FirstName,
                    LastName: userProfile.LastName
                }
            }));
        return res.status(200).send(userBoxesInfo);
    } catch (error){
        console.log(error)
        res.sendStatus(404);
    }
}

module.exports = {
    getProfiles,
    getProfileByUserId,
    addProfile,
    getUsersProfileBoxInfo
};