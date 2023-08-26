const Artist = require('../models/Artist');

const getArtistById = async (req, res) => {
    try {
        const artistId = req.param.id;
        const artist = await Artist.findById(artistId);
        res.status(200).send(artist);
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

const getArtists = async (req, res) => {
    try {
        let artists;
        if (req.query.ids === undefined) {
            artists = await Artist.find();
        } else {
            const artistsIds = req.query.ids.split(',');
            artists = await Promise.all(artistsIds.map(async artistId =>
                await Artist.findById(artistId)));
        }
        res.status(200).send(artists);
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

const addArtist = async (req, res) => {
    try {
        const createdArtist = await Artist.create(req.body);
        res.status(200).send(createdArtist._id);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const deleteArtist = async (req, res) => {
    try {
        const artistId = req.params.id;
        await Artists.findByIdAndDelete(artistId)
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const updateArtist = async (req, res) => {
    try {
        await Artist.findByIdAndUpdate(req.body._id, req.body);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = {
    getArtistById,
    getArtists,
    addArtist,
    deleteArtist,
    updateArtist
}