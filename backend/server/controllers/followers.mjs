import Follwers from "../models/Followers.mjs";
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');


export const createNewArtistFollowers = async (req, res) => {
    try {
        const artistId = req.body.artistId;
        const createdFollowers = await Follwers.create({
            artistId,
            followers: []
        });
        await fs.appendFile(logsFilePath, `Created empty followers list for artist ${artistId}\n`)
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
        await fs.appendFile(logsFilePath, `User ${userId} followed artist ${artistId}\n`)
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
        await fs.appendFile(logsFilePath, `User ${userId} unfollowed artist ${artistId}\n`)
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
            query.followers = {$in: usersIds.split(',')};
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
        await fs.appendFile(logsFilePath, `Deleted followers list for artist ${artistId}\n`)
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}