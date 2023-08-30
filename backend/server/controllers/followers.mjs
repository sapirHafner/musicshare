import Follwers from "../models/Follwers.mjs";

export const createNewArtistFollowers = async (req, res) => {
    try {
        const artistId = req.body.artistId;
        const createdFollowers = await Follwers.create({
            artistId,
            followers: []
        });
        res.status(200).send(createdFollowers._id);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const changeFollower = async (req, res) => {
    if (req.body.add)
    {
        await addFollower(req, res);
    } else {
        await removeFollower(req, res);
    }
}

export const addFollower = async (req, res) => {
    try {
        const artistId = req.body.artistId;
        const userId = req.body.userId;
        const artistFollowers = await Follwers.findOne({artistId})
        artistFollowers.followers.push(userId)
        await artistFollowers.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const removeFollower = async (req, res) => {
    try {
        const artistId = req.body.artistId;
        const userId = req.body.userId;
        const artistFollowers = await Follwers.findOne({artistId})
        artistFollowers.followers.remove(userId)
        await artistFollowers.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const getArtistFollowers = async (req, res) => {
    try {
        const artistId = req.params.artistId;
        res.status(200).send(await Follwers.findOne({artistId}));
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const getFollowers = async (req, res) => {
    try {
        const query = {};
        const usersIds = req.query.usersIds;
        if (usersIds !== undefined) {
            query.UsersIds = {$in: usersIds.split(',')};
        }
        res.status(200).send(await Follwers.find(query));
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const deleteArtistFollowers = async (req, res) => {
    try {
        const artistId = req.params.artistId;
        await Follwers.findOneAndDelete({artistId});
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}