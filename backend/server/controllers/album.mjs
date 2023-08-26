import Album from '../models/Album.mjs';

export const getAlbumById = async (req, res) => {
    try {
        const albumId = req.params.id;
        const album = Album.findById(albumId);
        res.status(200).send(album);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const getAlbums = async (req, res) => {
    try {
        const query = {};
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
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
