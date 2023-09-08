import Friends from "../models/Friends.mjs";
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');


export const getFriendsByUserId = async (req, res) => {
    try {
        const userFriends = await Friends.findOne({userId: req.params.userId});
        if (!userFriends) {
            res.sendStatus(404);
            return;
        }
        res.status(200).send(userFriends.friends);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const addNewFriendsListForUser = async (req, res) => {
    try {
        const createdFriends = await Friends.create({
            userId: req.params.userId,
            friends: []
        });
        await fs.appendFile(logsFilePath, `Created empty friends list for user ${req.params.userId}\n`)
        res.status(200).send(createdFriends._id);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            res.status(400).send(error.message);
            return;
        }
        res.status(500).send(error.message);
    }
}

export const changeFriendshipBetweenUsers = async (req, res) => {
    if (req.body.add) {
        await addFriendshipBetweenUsers(req, res);
    } else {
        await removeFriendshipBetweenUsers(req, res);
    }
}

export const addFriendshipBetweenUsers = async (req, res) => {
    try {
        const { FirstUserId, SecondUserId } = req.body;
        const firstUserFriends = await Friends.findOne({userId: FirstUserId});
        const secondUserFriends = await Friends.findOne({userId: SecondUserId});
        if (!firstUserFriends) {
            res.status(404).send(`User ${FirstUserId} friends not found`);
            return;
        }
        if (!secondUserFriends) {
            res.status(404).send(`User ${SecondUserId} friends not found`);
            return;
        }
        if (firstUserFriends.friends.includes(SecondUserId)) {
            res.status(400).send(`User ${FirstUserId} friends already include ${SecondUserId}`);
            return;
        }
        if (secondUserFriends.friends.includes(FirstUserId)) {
            res.status(400).send(`User ${SecondUserId} friends already include ${FirstUserId}`);
            return;
        }
        firstUserFriends.friends.push(SecondUserId);
        await firstUserFriends.save();
        secondUserFriends.friends.push(FirstUserId);
        await secondUserFriends.save();
        await fs.appendFile(logsFilePath, `Added friendship between user ${FirstUserId} and user ${SecondUserId}\n`)
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const removeFriendshipBetweenUsers = async (req, res) => {
    try {
        const { FirstUserId, SecondUserId} = req.body;
        const firstUserFriends = await Friends.findOne({userId: FirstUserId});
        const secondUserFriends = await Friends.findOne({userId: SecondUserId});
        if (!firstUserFriends) {
            res.status(404).send(`User ${FirstUserId} friends not found`);
            return;
        }
        if (!secondUserFriends) {
            res.status(404).send(`User ${SecondUserId} friends not found`);
            return;
        }
        if (!firstUserFriends.friends.includes(SecondUserId)) {
            res.status(400).send(`User ${FirstUserId} friends don't include ${SecondUserId}`);
            return;
        }
        if (!secondUserFriends.friends.includes(FirstUserId)) {
            res.status(400).send(`User ${SecondUserId} friends don't include ${FirstUserId}`);
            return;
        }
        firstUserFriends.Friends.friends.remove(secondUserId);
        await firstUserFriends.save();
        secondUserFriends.Friends.remove(firstUserId);
        await secondUserFriends.save();
        await fs.appendFile(logsFilePath, `Removed friendship between user ${FirstUserId} and user ${SecondUserId}\n`)
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const deleteUserFriends = async (req, res) => {
    try {
        const userFriends = await Friends.findOneAndDelete({userId: req.params.userId});
        if (!userFriends) {
            res.sendStatus(404).send('User friends not found');
            return;
        }
        const updateResult = await Friends.updateMany(
            {},
            { $pull: { friends: req.params.userId } })
        await fs.appendFile(logsFilePath, `Delete user ${req.params.userId} friends\n`)
        res.status(200).send(`Matched ${updateResult.matchedCount} documents, modified ${updateResult.modifiedCount} documents`);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}


