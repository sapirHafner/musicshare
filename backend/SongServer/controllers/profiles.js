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
        const createdProfile = await Profile.create(req.body);
        res.status(200).send(createdProfile._id);
    } catch {
        res.sendStatus(400);
    }
}

const getUsersProfileBoxInfo = async (req, res) => {
    try {
        let profiles;
        if (req.query.id === undefined) {
            profiles = await Profile.find();

        } else {
            const userIds = req.query.id.split(',');
            profiles = await Promise.all(userIds.map(async userId =>
                await Profile.findOne({"UserId": userId})
            ))
        }
        const profilesBoxes = profiles.map(profile => {
            return {
            UserId: profile.UserId,
            FirstName: profile.FirstName,
            LastName: profile.LastName
        }});
        res.status(200).send(profilesBoxes);
    } catch (error){
        console.log(error)
        res.sendStatus(400);
    }
}

const getUserProfileBoxInfoById = async (req, res) => {
    const userId = req.params.userId;
    const profile = await Profile.findOne({"UserId": userId});
    const profileBox =  {
        UserId: profile.UserId,
        FirstName: profile.FirstName,
        LastName: profile.LastName
    }
    res.status(200).send(profileBox);
}
module.exports = {
    getProfiles,
    getProfileByUserId,
    addProfile,
    getUsersProfileBoxInfo,
    getUserProfileBoxInfoById
};