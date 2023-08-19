const Friends = require("../models/Friends");

const getFriendsByUserId = async (req, res) => {
    try {
        const userFriends = await Friends.findOne({UserId: req.params.userId});
        res.status(200).send(userFriends.Friends);
    } catch {
        res.sendStatus(404);
    }
}

const addNewFriendsListForUser = async (req, res) => {
    try {
        await Friends.create({
            UserId: req.params.userId,
            Friends: []
        });
        res.sendStatus(200);
    } catch {
        res.sendStatus(404);
    }
}

const addFriendshipBetweenUsers = async (req, res) => {
    try {
        const firstUserId = req.body.FirstUserId;
        const secondUserId = req.body.SecondUserId;
        const firstUserFriends = await Friends.findOne({UserId: firstUserId});
        const secondUserFriends = await Friends.findOne({UserId: secondUserId});
        if (!firstUserFriends || !secondUserFriends) {
            res.sendStatus(404);
        } else {
            firstUserFriends.Friends.push(secondUserId);
            await firstUserFriends.save();
            secondUserFriends.Friends.push(firstUserId);
            await secondUserFriends.save();
            res.sendStatus(200);

        }
    } catch {
        res.sendStatus(500);
    }

    }


module.exports = { getFriendsByUserId, addNewFriendsListForUser, addFriendshipBetweenUsers };