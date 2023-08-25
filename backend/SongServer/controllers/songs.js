const Song = require("../models/Song");

const getAllSongs = async (req, res) => {
    try {
        let songs;
        if (req.query.id === undefined) {
            songs = await Song.find();
        } else {
            const songIds = req.query.id.split(',');
            songs = await Promise.all(songIds.map(async songId =>
                await Song.findOne({"_id": songId})));
        }
        res.status(200).send(songs);
    } catch {
        res.sendStatus(400);
    }
}

const getSongFromId = async (req, res) => {
    try {
        const songId = req.params.songId;
        const song = await Song.findOne({"_id": songId})
        res.status(200).send(song);
    } catch {
        res.sendStatus(400);
    }
}


const addSong = async (req, res) => {
    try {
        const createdSong = await Song.create(req.body);
        res.status(200).send(createdSong._id);
    } catch {
        res.sendStatus(400);
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

module.exports = {
    getAllSongs,
    getSongFromId,
    addSong,
    deleteSong };