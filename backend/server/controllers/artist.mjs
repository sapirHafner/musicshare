import Artist from '../models/Artist.mjs';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');

export const getArtistById = async (req, res) => {
    try {
        const artistId = req.params.id;
        const artist = await Artist.findById(artistId);
        res.status(200).send(artist);
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}
export const getArtists = async (req, res) => {
    try {
        const query = {};
        const artistsIds = req.query.ids;
        if (artistsIds !== undefined) {
            query._id = {$in: artistsIds.split(',')}
        }
        const userIds = req.query.userIds;
        if (userIds !== undefined) {
            query.UserId = {$in: userIds.split(',')}
        }
        const artists = await Artist.find(query);
        res.status(200).send(artists);
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

export const addArtist = async (req, res) => {
    try {
        const createdArtist = await Artist.create(req.body);
        await fs.appendFile(logsFilePath, `User ${req.body.UserId} artist profile created\n`)
        res.status(200).send(createdArtist._id);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const deleteArtist = async (req, res) => {
    try {
        const artistId = req.params.artistId;
        await Artist.findByIdAndDelete(artistId);
        await fs.appendFile(logsFilePath, `Artist ${artistId} ]deleted\n`)
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const updateArtist = async (req, res) => {
    try {
        const artistId = req.body._id;
        await Artist.findByIdAndUpdate(artistId, req.body);
        await fs.appendFile(logsFilePath, `Artist ${artistId} updated\n`)
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
