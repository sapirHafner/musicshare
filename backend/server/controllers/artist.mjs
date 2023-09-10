import Artist from '../models/Artist.mjs';
import FeatureFlag from '../models/FeatureFlag.mjs';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');

export const getArtist = async (req, res) => {
    try {
        const imagesFeatureFlag = (await FeatureFlag.findOne({"name": "images"})).active;
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            res.sendStatus(404);
            return;
        }
        if (!imagesFeatureFlag) {
            artist.imageUrl = null;
        }
        res.status(200).send(artist);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
export const getArtists = async (req, res) => {
    try {
        const imagesFeatureFlag = (await FeatureFlag.findOne({"name": "images"})).active;
        const query = {};
        if (req.query.ids !== undefined) {
            query._id = {$in: req.query.ids.split(',')}
        }

        if (req.query.userId !== undefined) {
            query.userId = req.query.userId
        }
        const artists = await Artist.find(query);
        if (!imagesFeatureFlag) {
            artists.forEach(_ => _.imageUrl = null)
        }
        res.status(200).send(artists);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const addArtist = async (req, res) => {
    try {
        const createdArtist = await Artist.create(req.body);
        await fs.appendFile(logsFilePath, `Artist ${req.body.userId} created\n`)
        res.status(200).send(createdArtist._id);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            res.status(400).send(error.message);
            return;
        }
        res.status(500).send(error.message);
    }
}

export const deleteArtist = async (req, res) => {
    try {
        const deletedArtist = await Artist.findByIdAndDelete(req.params.artistId);
        if (!deletedArtist) {
            res.sendStatus(404);
            return;
        }
        await fs.appendFile(logsFilePath, `Artist ${deletedArtist._id} deleted\n`)
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const updateArtist = async (req, res) => {
    try {
        const updatedArtist = await Artist.findByIdAndUpdate(req.body._id, req.body, { new: true });
        if (!updatedArtist) {
            res.sendStatus(404);
            return;
        }
        await fs.appendFile(logsFilePath, `Artist ${updatedArtist._id} updated\n`)
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            res.status(400).send(error.message);
            return;
        }
        res.status(500).send(error.message);
    }
}
