import FriendsRequests from '../models/FriendsRequests.mjs';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');

export const getFriendsRequestsByUserId = async (req, res) => {
    try {
        const userFriendsRequests = await FriendsRequests.findOne({userId: req.params.userId});
        if (!userFriendsRequests) {
            res.sendStatus(404).send('User friends requests not found');
            return;
        }
        res.status(200).send(userFriendsRequests.requestsUserIds);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const createNewFriendsRequestsList = async (req, res) => {
    try {
        const createdArray = await FriendsRequests.create({
            userId: req.body.userId,
            requestsUserIds: []
        })
        await fs.appendFile(logsFilePath, `Created empty friends list for user ${req.body.userId}\n`)
        res.status(200).send(createdArray._id);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            res.status(400).send(error.message);
            return;
        }
        res.status(500).send(error.message);
    }
}

export const changeFriendsRequest = async (req, res) => {
    if (req.body.add) {
        await addFriendsRequest(req, res);
    } else {
        await removeFriendsRequest(req, res)
    }
}

export const addFriendsRequest = async (req, res) => {
    try {
        const { askingUserId, receivingUserId } = req.body;
        let receivingUserFriendsRequests = await FriendsRequests.findOne({userId: receivingUserId});
        if (!receivingUserFriendsRequests) {
            res.sendStatus(404).send;('Receiving user id friends requests not found');
            return;
        }
        if (receivingUserFriendsRequests.requestsUserIds.includes(askingUserId)) {
            res.sendStatus(400).send;('Receiving user id friends requests already includes asking user Id');
            return;
        }
        receivingUserFriendsRequests.requestsUserIds.push(askingUserId);
        await fs.appendFile(logsFilePath, `Added friend request from user ${askingUserId} to user ${receivingUserId}\n`)
        await receivingUserFriendsRequests.save();
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const removeFriendsRequest = async (req, res) => {
    try {
        const { askingUserId, receivingUserId } = req.body;
        const receivingUserFriendsRequests = await FriendsRequests.findOne({userId: receivingUserId});
        if (!receivingUserFriendsRequests) {
            res.sendStatus(404).send;('Receiving user id friends requests not found');
            return;
        }
        if (!receivingUserFriendsRequests.requestsUserIds.includes(askingUserId)) {
            res.sendStatus(400).send;("Receiving user id doesn't include asking user Id");
            return;
        }
        receivingUserFriendsRequests.requestsUserIds.remove(askingUserId);
        await receivingUserFriendsRequests.save();
        await fs.appendFile(logsFilePath, `Removed friend request from user ${askingUserId} to user ${receivingUserId}\n`)
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const deleteUserFriendRequests = async (req, res) => {
    try {
        const deletedFriendsRequests = await FriendsRequests.findOneAndDelete({userId: req.params.userId});
        if (!deletedFriendsRequests) {
            res.sendStatus(404).send('User friends requests not found');
            return;
        }
        await fs.appendFile(logsFilePath, `Delete user ${req.params.userId} friend requests\n`)
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}