import Album from '../models/Album.mjs';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');

export const getAlbumById = async (req, res) => {
    try {
        const albumId = req.params.id;
        const album = await Album.findById(albumId);
        res.status(200).send(album);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const getAlbums = async (req, res) => {
    try {
        const query = {};
        const albumsIds = req.query.ids;
        if (albumsIds != undefined) {
            query._id = {$in: albumsIds.split(',')}
        }
        const artistId = req.query.artistId;
        if (artistId != undefined) {
            query.ArtistId = artistId;
        }
        const albums = await Album.find(query);
        res.status(200).send(albums);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const addAlbum = async (req, res) => {
    try {
        const createdAlbum = await Album.create(req.body);
        await fs.appendFile(logsFilePath, `Album ${createdAlbum._id} created\n`)
        res.status(200).send(createdAlbum._id);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const deleteAlbum = async (req, res) => {
    try {
        const albumId = req.params.id;
        await Album.findByIdAndDelete(albumId);
        await fs.appendFile(logsFilePath, `Album ${albumId} deleted\n`)
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const updateAlbum = async (req, res) => {
    try {
        const albumId = req.body._id;
        await Album.findByIdAndUpdate(albumId, req.body);
        await fs.appendFile(logsFilePath, `Album ${albumId} updated\n`)
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const deleteAlbums = async (req, res) => {
    try {
        const artistId = req.query.artistId;
        if (artistId !== undefined) {
            await Album.deleteMany({ArtistId: artistId})
        }
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}