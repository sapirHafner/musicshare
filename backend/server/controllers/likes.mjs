import Likes from '../models/Likes.mjs';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');

export const getMusicalEntityLikes = async (req, res) => {
    try {
        const musicalEntityId = req.params.musicalEntityId;
        res.status(200).send(await Likes.findOne({'MusicalEntity.Id': musicalEntityId}));
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export const changeUserLike = async (req, res) => {
    if (req.body.Add)
    {
        await addUserLike(req, res);
    } else {
        await removeUserLike(req, res);
    }
}

const addUserLike = async (req, res) => {
    try {
        const musicalEntity = req.body.MusicalEntity;
        const userId = req.body.UserId;
        const musicalEntityLikes = await Likes.findOne({MusicalEntity: musicalEntity})
        if (musicalEntityLikes.UsersIds.includes(userId)) {
            res.sendStatus(404);
        } else {
            musicalEntityLikes.UsersIds.push(userId);
            await musicalEntityLikes.save();
            await fs.appendFile(logsFilePath, `User ${userId} liked ${musicalEntity.Type} ${musicalEntity.Id}\n`)
            res.sendStatus(200);
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

const removeUserLike = async (req, res) => {
    try {
        const musicalEntity = req.body.MusicalEntity;
        const userId = req.body.UserId;
        const musicalEntityLikes = await Likes.findOne({MusicalEntity: musicalEntity});
        if (!musicalEntityLikes.UsersIds.includes(userId)) {
            res.sendStatus(404);
        } else {
            musicalEntityLikes.UsersIds.remove(userId);
            await musicalEntityLikes.save();
            await fs.appendFile(logsFilePath, `User ${userId} disliked ${musicalEntity.Type} ${musicalEntity.Id}\n`)
            res.sendStatus(200);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}
export const getLikes = async (req, res) => {
    try {
        const query = {};
        const usersIds = req.query.usersIds;
        if (usersIds !== undefined) {
            query.UsersIds = {$in: usersIds.split(',')};
        }
        res.status(200).send(await Likes.find(query));
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const createLikes = async (req, res) => {
    try {
        const createdLikes = await Likes.create({
            MusicalEntity: req.body.MusicalEntity,
            UsersIds: []
        });
        await fs.appendFile(logsFilePath, `Created empty likes list for ${req.body.MusicalEntity.Type} ${req.body.MusicalEntity.Id}\n`)
        res.status(200).send(createdLikes._id);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export const deleteUserLikes = async (req, res) => {
    try {
        const userId = req.query.userId;
        await Likes.updateMany(
            {},
            { $pull: { "UsersIds": userId } })
        await fs.appendFile(logsFilePath, `Delete user ${userId} likes\n`)
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const deleteMusicalEntityLikes = async (req, res) => {
    try {
        const musicalEntityId = req.params.id;
        await Likes.findOneAndDelete({"MusicalEntity.Id": musicalEntityId});
        await fs.appendFile(logsFilePath, `Musical entity ${musicalEntityId} likes deleted\n`)
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}