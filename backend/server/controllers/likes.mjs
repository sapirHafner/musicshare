import Likes from '../models/Likes.mjs';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');

export const getMusicalEntityLikes = async (req, res) => {
    try {
        const musicalEntityLikes = await Likes.findOne({'musicalEntity.id': req.params.musicalEntityId});
        if (!musicalEntityLikes) {
            res.sendStatus(404);
            return;
        }
        res.status(200).send(musicalEntityLikes);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const changeUserLike = async (req, res) => {
    if (req.body.add) {
        await addUserLike(req, res);
    } else {
        await removeUserLike(req, res);
    }
}

const addUserLike = async (req, res) => {
    try {
        const musicalEntityLikes = await Likes.findOne({musicalEntity: req.body.musicalEntity})
        if (!musicalEntityLikes) {
            res.sendStatus(404);
            return;
        }
        if (musicalEntityLikes.usersIds.includes(req.body.userId)) {
            res.status(400).send('Musical entity likes already include user Id');
            return;
        }
        musicalEntityLikes.usersIds.push(req.body.userId);
        await musicalEntityLikes.save();
        await fs.appendFile(logsFilePath, `User ${req.body.userId} liked ${req.body.musicalEntity.type} ${req.body.musicalEntity.id}\n`)
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

const removeUserLike = async (req, res) => {
    try {
        const musicalEntityLikes = await Likes.findOne({musicalEntity: req.body.musicalEntity});
        if (!musicalEntityLikes) {
            res.sendStatus(404);
            return;
        }
        if (!musicalEntityLikes.usersIds.includes(req.body.userId)) {
            res.status(400).send("Musical entity doesn't include user Id");
            return;
        }
        musicalEntityLikes.usersIds.remove(req.body.userId);
        await musicalEntityLikes.save();
        await fs.appendFile(logsFilePath, `User ${req.body.userId} disliked ${req.body.musicalEntity.type} ${req.body.musicalEntity.id}\n`)
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
export const getLikes = async (req, res) => {
    try {
        const query = {};
        if (req.query.usersIds !== undefined) {
            query.usersIds = {$in: req.query.usersIds.split(',')};
        }
        res.status(200).send(await Likes.find(query));
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const getUserLikes = async (req, res) => {
    try {
        const userLikes = await Likes.find({usersIds: {$in:req.params.id}})
        res.status(200).send(userLikes);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const createLikes = async (req, res) => {
    try {
        const createdLikes = await Likes.create({
            musicalEntity: req.body.musicalEntity,
            usersIds: []
        });
        await fs.appendFile(logsFilePath, `Created empty likes list for ${req.body.musicalEntity.type} ${req.body.musicalEntity.id}\n`)
        res.status(200).send(createdLikes._id);
    } catch (error) {
        console.error(error)
        if (error.name === 'ValidationError') {
            res.status(400).send(error.message);
            return;
        }
        res.status(500).send(error.message);
    }
}

export const deleteUserLikes = async (req, res) => {
    try {
        const updateResult = await Likes.updateMany(
            {},
            { $pull: { "usersIds": req.params.id } })
        await fs.appendFile(logsFilePath, `Delete user ${userId} likes\n`)
        res.status(200).send(`Matched ${updateResult.matchedCount} documents, modified ${updateResult.modifiedCount} documents`);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const deleteMusicalEntityLikes = async (req, res) => {
    try {
        const deletedMusicalEntity = await Likes.findOneAndDelete({"MusicalEntity.Id": req.params.id});
        if (!deletedMusicalEntity) {
            res.sendStatus(404);
            return;
        }
        await fs.appendFile(logsFilePath, `Musical entity ${musicalEntityId} likes deleted\n`)
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}