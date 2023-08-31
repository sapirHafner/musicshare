import Song from "../models/Song.mjs";

export const getAllSongs = async (req, res) => {
    try {
        let songs;
        if (req.query.ids === undefined) {
            songs = await Song.find();
        } else {
            const songIds = req.query.ids.split(',');
            songs = await Promise.all(songIds.map(async songId =>
                await Song.findOne({"_id": songId})));
        }
        res.status(200).send(songs);
    } catch {
        res.sendStatus(400);
    }
}

export const getSongFromId = async (req, res) => {
    try {
        const songId = req.params.songId;
        const song = await Song.findOne({"_id": songId})
        res.status(200).send(song);
    } catch {
        res.sendStatus(400);
    }
}


export const addSongs = async (req, res) => {
    try {
        const createdSongs = await Promise.all(req.body.Songs.map(async song => await Song.create(song)));
        res.status(200).send(createdSongs.map(song => song._id));
    } catch (error) {
        res.sendStatus(500);
    }
}

export const deleteSong = async (req, res) => {
    try {
        const songId = req.params.songId;
        await Song.findByIdAndDelete(songId);
        res.sendStatus(200);
    } catch {
        res.sendStatus(404);
    }
}
