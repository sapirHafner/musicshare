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

module.exports = { getProfiles, getProfileByUserId, addProfile };