import Song from "../models/Song.mjs";
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');

export const getSongs = async (req, res) => {
    try {
        const query = {};
        if (req.query.ids !== undefined) {
            query._id = {$in: req.query.ids.split(',')}
        }
        res.status(200).send(await Song.find(query));
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const getSong = async (req, res) => {
    try {
        const song = await Song.findOne({"_id": req.params.songId})
        if (!song) {
            res.sendStatus(404);
            return;
        }
        res.status(200).send(song);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}


export const addSongs = async (req, res) => {
    try {
        const createdSongs = await Song.insertMany(req.body.songs);
        await fs.appendFile(logsFilePath, `Songs ${createdSongs.map(_ => _.id).join(', ')} created\n`)
        res.status(200).send(createdSongs.map(song => song._id));
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const deleteSong = async (req, res) => {
    try {
        const deletedSong = await Song.findByIdAndDelete(req.params.songId);
        if (!deletedSong) {
            res.sendStatus(404);
            return;
        }
        await fs.appendFile(logsFilePath, `Song ${songId} deleted\n`)
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const deleteSongs = async (req, res) => {
    try {
        const query = {}
        if (req.query.albumId !== undefined) {
            query.albumId = req.query.albumId;
        }
        const deleteResult = await Song.deleteMany(query);
        await fs.appendFile(logsFilePath, `Deleted ${deleteResult.deletedCount} songs\n`)
        res.status(200).send(`Matched ${deleteResult.n} documents, deleted ${deleteResult.deletedCount} documents`);

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}