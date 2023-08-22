const Song = require("../models/Song");

const getAllSongs = async (req, res) => {
    try {
        const allSongs = await Song.find();
        res.status(200).send(allSongs);
    } catch {
        res.sendStatus(400);
    }
}

const getSongsFromIds = async (req, res) => {
    try {
        const songIds = req.params.songIds.split(',');
        const songs = await Promise.all(songIds.map(async (songId) => {
            const song = await Song.findOne({"_id": songId})
            return song;
        }));
        res.status(200).send(songs);
    } catch {
        res.sendStatus(400);
    }
}

const addSong = async (req, res) => {
    try {
        await Song.create(req.body);
        res.sendStatus(200);
    } catch {
        res.sendStatus(404);
    }
}

const deleteSong = async (req, res) => {
    try {
        const songId = req.params.songId;
        await Song.findByIdAndDelete(songId);
        res.sendStatus(200);
    } catch {
        res.sendStatus(404);
    }
}

module.exports = { getAllSongs, getSongsFromIds, addSong, deleteSong };