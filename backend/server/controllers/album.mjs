import Album from '../models/Album.mjs';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');

export const getAlbum = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) {
            res.sendStatus(404);
            return;
        }
        res.status(200).send(album);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const getAlbums = async (req, res) => {
    try {
        const query = {};
        if (req.query.ids != undefined) {
            query._id = {$in: req.query.ids.split(',')}
        }
        if (req.query.artistId != undefined) {
            query.ArtistId = req.query.artistId;
        }
        const albums = await Album.find(query);
        res.status(200).send(albums);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const addAlbum = async (req, res) => {
    try {
        console.log(req.body)
        const createdAlbum = await Album.create(req.body);
        await fs.appendFile(logsFilePath, `Album ${createdAlbum._id} created\n`);
        res.status(200).send(createdAlbum._id);
    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            res.status(400).send(error.message);
            return;
        }
        res.status(500).send(error.message);
    }
}

export const deleteAlbum = async (req, res) => {
    try {
        const deletedAlbum = await Album.findByIdAndDelete(req.params.id);
        if (!deletedAlbum) {
            res.sendStatus(404);
            return;
        }
        await fs.appendFile(logsFilePath, `Album ${deletedAlbum.id} deleted\n`);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const updateAlbum = async (req, res) => {
    try {
        const updatedAlbum = await Album.findByIdAndUpdate(req.body._id, req.body, { new: true });
        if (!updatedAlbum) {
            res.sendStatus(404);
            return;
        }
        await fs.appendFile(logsFilePath, `Album ${updatedAlbum._id} updated\n`);
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

export const deleteAlbums = async (req, res) => {
    try {
        const query = {}
        if (req.query.artistId !== undefined) {
            query.artistId = req.query.artistId;
        }
        const deleteResult = await Album.deleteMany(query);
        await fs.appendFile(logsFilePath, `Deleted ${deleteResult.deletedCount} albums\n`)
        res.status(200).send(`Matched ${deleteResult.n} documents, deleted ${deleteResult.deletedCount} documents`);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}