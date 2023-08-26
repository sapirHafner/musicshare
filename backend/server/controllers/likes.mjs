import Likes from '../models/Likes.mjs';

export const getMusicalEntityLikes = async (req, res) => {
    try {
        const musicalEntityId = req.params.getMusicalEntityId;
        res.status(200).send(await Likes.findOne({'MusicalEntity.Id': musicalEntityId}));
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export const changeUserLike = async (req, res) => {
    if (req.body.Add)
    {
        await addUserLike(req, res);
    } else {
        await removeUserLike(req, res);
    }
}

const addUserLike = async (req, res) => {
    try {
        const musicalEntity = req.body.MusicalEntity;
        const userId = req.body.UserId;
        const musicalEntityLikes = await Likes.findOne({MusicalEntity: musicalEntity});
        if (musicalEntityLikes.UsersIds.includes(userId)) {
            res.sendStatus(404);
        } else {
            musicalEntityLikes.UsersIds.push(userId);
            await musicalEntityLikes.save();
            res.sendStatus(200);
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

const removeUserLike = async (req, res) => {
    try {
        const musicalEntity = req.body.MusicalEntity;
        const userId = req.body.UserId;
        const musicalEntityLikes = await Likes.findOne({MusicalEntity: musicalEntity});
        if (!musicalEntityLikes.UsersIds.includes(userId)) {
            res.sendStatus(404);
        } else {
            musicalEntityLikes.UsersIds.remove(userId);
            await musicalEntityLikes.save();
            res.sendStatus(200);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}
export const getLikes = async (req, res) => {
    try {
        const query = {};
        const usersIds = req.query.usersIds;
        if (usersIds !== undefined) {
            query.UsersIds = {$in: usersIds.split(',')};
        }
        res.status(200).send(await Likes.find(query));
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const createLikes = async (req, res) => {
    try {
        const createdLikes = await Likes.create({
            MusicalEntity: req.body.MusicalEntity,
            UsersIds: []
        });
        res.status(200).send(createdLikes._id);
    } catch {
        res.sendStatus(404);
    }
}


