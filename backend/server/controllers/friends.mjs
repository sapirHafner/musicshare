import Friends from "../models/Friends.mjs";

export const getFriendsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId
        const userFriends = await Friends.findOne({UserId: userId});
        res.status(200).send(userFriends.Friends);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);

    }
}

export const addNewFriendsListForUser = async (req, res) => {
    try {
        const userId = req.params.userId
        const createdFriends = await Friends.create({
            UserId: userId,
            Friends: []
        });
        res.status(200).send(createdFriends._id);
    } catch (errror) {
        console.log(error)
        res.sendStatus(500);
    }
}

export const addFriendshipBetweenUsers = async (req, res) => {
    try {
        const { FirstUserId, SecondUserId} = req.body;
        const firstUserFriends = await Friends.findOne({UserId: FirstUserId});
        const secondUserFriends = await Friends.findOne({UserId: SecondUserId});
        if (!firstUserFriends || !secondUserFriends) {
            res.sendStatus(404);
        } else {
            firstUserFriends.Friends.push(secondUserId);
            await firstUserFriends.save();
            secondUserFriends.Friends.push(firstUserId);
            await secondUserFriends.save();
            res.sendStatus(200);

        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export const removeFriendshipBetweenUsers = async (req, res) => {
    try {
        const { FirstUserId, SecondUserId} = req.body;
        const firstUserFriends = await Friends.findOne({UserId: FirstUserId});
        const secondUserFriends = await Friends.findOne({UserId: SecondUserId});
        if (!firstUserFriends || !secondUserFriends) {
            res.sendStatus(404);
        } else {
            firstUserFriends.Friends.remove(secondUserId);
            await firstUserFriends.save();
            secondUserFriends.Friends.remove(firstUserId);
            await secondUserFriends.save();
            res.sendStatus(200);

        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}


