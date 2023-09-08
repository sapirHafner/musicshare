import Followers from "../models/Followers.mjs";
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');


export const createNewArtistFollowers = async (req, res) => {
    try {
        const createdFollowers = await Followers.create({
            artistId: req.body.artistId,
            followers: []
        });
        await fs.appendFile(logsFilePath, `Created empty followers list for artist ${req.body.artistId}\n`)
        res.status(200).send(createdFollowers._id);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            res.status(400).send(error.message);
            return;
        }
        res.status(500).send(error.message);
    }
}

export const changeFollower = async (req, res) => {
    if (req.body.add) {
        await addFollower(req, res);
    } else {
        await removeFollower(req, res);
    }
}

export const addFollower = async (req, res) => {
    try {
        const artistFollowers = await Followers.findOne({artistId: req.body.artistId})
        if (!artistFollowers) {
            res.sendStatus(404);
            return;
        }
        artistFollowers.followers.push(req.body.userId)
        await artistFollowers.save();
        await fs.appendFile(logsFilePath, `User ${body.userId} followed artist ${req.body.artistId}\n`)
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const removeFollower = async (req, res) => {
    try {
        const artistFollowers = await Followers.findOne({artistId: req.body.artistId})
        artistFollowers.followers.remove(req.body.userId)
        await artistFollowers.save();
        await fs.appendFile(logsFilePath, `User ${req.body.userId} unfollowed artist ${req.body.artistId}\n`)
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const getArtistFollowers = async (req, res) => {
    try {
        const artistFollowers = await Followers.findOne({artistId: req.params.artistId});
        if (!artistFollowers) {
            res.sendStatus(404);
            return;
        }
        res.status(200).send(artistFollowers);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const getFollowers = async (req, res) => {
    try {
        res.status(200).send(Followers.find());
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const getUserFollows = async (req, res) => {
    try {
        const userFollows = await Followers.find({followers: {$in: req.params.id}});
        res.status(200).send(userFollows);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}


export const deleteArtistFollowers = async (req, res) => {
    try {
        const deletedArtistFollowers = await Followers.findOneAndDelete({artistId: req.params.artistId});
        if (!deletedArtistFollowers) {
            res.sendStatus(404);
            return;
        }
        await fs.appendFile(logsFilePath, `Deleted followers list for artist ${req.params.artistId}\n`)
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const deleteUserFollows = async (req, res) => {
    try {
        const updateResult = await Followers.updateMany(
            {},
            { $pull: { followers: req.params.id } })
        await fs.appendFile(logsFilePath, `Deleted user ${userId} follows from ${updateResult.modifiedCount} documents\n`)
        res.status(200).send(`Matched ${updateResult.matchedCount} documents, modified ${updateResult.modifiedCount} documents`);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}