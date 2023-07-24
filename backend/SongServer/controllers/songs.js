const Song = require("../models/Song");

const getAllSongs = async (req, res) => {
    try {
        const allSongs = await Song.find();
        res.status(200).send(allSongs);
    } catch {
        res.sendStatus(400);
    }
}

const addSong = async (req, res) => {
    try {
        const name = req.body.name;
        const album = req.body.album;
        const artist = req.body.artist;
        const length = req.body.length;
        await Song.create({
            name,
            album,
            artist,
            length
        });
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

module.exports = { getAllSongs, addSong, deleteSong };