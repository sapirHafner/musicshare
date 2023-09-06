import FriendsRequests from '../models/FriendsRequests.mjs';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');

export const getFriendsRequestsByUserId = async (req, res) => {
    try {
        const userFriendsRequests = await FriendsRequests.findOne({UserId: req.params.userId});
        res.status(200).send(userFriendsRequests.RequestUserIds);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export const createNewFriendsRequestsArray = async (req, res) => {
    try {
        const userId = req.body.UserId;
        const createdArray = await FriendsRequests.create({
            UserId: userId,
            RequestUsersIds: []
        })
        await fs.appendFile(logsFilePath, `Created empty friends list for user ${userId}\n`)
        res.status(200).send(createdArray._id);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
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
        let receivingUserFriendsRequests = await FriendsRequests.findOne({UserId: receivingUserId});
        if (!receivingUserFriendsRequests || receivingUserFriendsRequests.RequestUserIds.includes(askingUserId)) {
            res.sendStatus(404);
        } else {
            receivingUserFriendsRequests.RequestUserIds.push(askingUserId);
            await fs.appendFile(logsFilePath, `Added friend request from user ${askingUserId} to user ${receivingUserId}\n`)
            await receivingUserFriendsRequests.save();
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const removeFriendsRequest = async (req, res) => {
    try {
        const { askingUserId, receivingUserId } = req.body;
        const receivingUserFriendsRequests = await FriendsRequests.findOne({UserId: receivingUserId});
        if (!receivingUserFriendsRequests || !receivingUserFriendsRequests.RequestUserIds.includes(askingUserId)) {
            res.sendStatus(404);
        } else {
            receivingUserFriendsRequests.RequestUserIds.remove(askingUserId);
            await receivingUserFriendsRequests.save();
            await fs.appendFile(logsFilePath, `Removed friend request from user ${askingUserId} to user ${receivingUserId}\n`)
            res.sendStatus(200);
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export const deleteUserFriendRequests = async (req, res) => {
    try {
        const userId = req.params.userId;
        await FriendsRequests.findOneAndDelete({UserId: userId})
        await fs.appendFile(logsFilePath, `Delete user ${userId} friend requests\n`)
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}