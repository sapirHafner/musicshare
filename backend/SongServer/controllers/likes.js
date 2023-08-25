const Likes = require("../models/Likes");

const getLikingUsersByObjectId = async (req, res) => {
    try {
        const objectId = req.params.objectId;
        // valiate object Id is a real object Id
        const likes = await Likes.findOne({ObjectId: objectId});
        return likes["UserIds"];
    } catch {
        res.sendStatus(400);
    }
}

const changeUserLike = async (req, res) => {
    const add = req.body.add;
    if (add)
    {
        await addUserLike(req, res);
    } else {
        await removeUserLike(req, res);
    }
}

const addUserLike = async (req, res) => {
    try {
        const objectId = req.body.objectId;
        const userId = req.body.userId;
        const likes = await Likes.findOne({ObjectId: objectId});
        if (likes["UsersIds"].includes(userId)) {
            res.sendStatus(404);
        } else {
            likes["UsersIds"].push(userId);
            await likes.save();
            res.sendStatus(200);
        }
    } catch {
        res.sendStatus(400);
    }
}

const removeUserLike = async (req, res) => {
    try {
        const objectId = req.body.objectId;
        const userId = req.body.userId;
        const likes = await Likes.findOne({ObjectId: objectId});
        if (!(likes["UsersIds"].includes(userId))) {
            res.sendStatus(404);
        }
        likes["UsersIds"].remove(userId);
        await likes.save();
        res.sendStatus(200);
    } catch {
        res.sendStatus(400);
    }
}

const getAllLikesOfUserByUserId = async (req, res) => {
    const userId = req.params.userId;
    const LikedObjects = await Likes.find({UsersIds: userId})
    const LikedObjectsIds = LikedObjects.map(likedObject => likedObject.ObjectId);
    return res.status(200).send(LikedObjectsIds);
}

const addNewLikesListForObject = async (req, res) => {
    try {
        const createdLikes = await Likes.create({
            ObjectId: req.params.objectId,
            UsersIds: []
        });
        res.status(200).send(createdLikes._id);
    } catch {
        res.sendStatus(404);
    }
}


module.exports = {
    getLikingUsersByObjectId,
    changeUserLike,
    getAllLikesOfUserByUserId,
    addNewLikesListForObject
};




