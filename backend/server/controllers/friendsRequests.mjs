import FriendsRequests from '../models/FriendsRequests.mjs';

export const getFriendsRequestsByUserId = async (req, res) => {
    try {
        const userFriendsRequests = await FriendsRequests.findOne({UserId: req.params.userId});
        res.status(200).send(userFriendsRequests.RequestUserIds);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export const createNewFriendsRequestsArray = async (req, res) => {
    try {
        const userId = req.body.UserId;
        const createdArray = await FriendsRequests.create({
            UserId: userId,
            RequestUsersIds: []
        })
        res.status(200).send(createdArray._id);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const addFriendRequestByUserId = async (req, res) => {
    try {
        const askingUserId = req.body.askingUserId;
        const receivingUserId = req.body.receivingUserId;
        let receivingUserFriendsRequests = await FriendsRequests.findOne({UserId: receivingUserId});

        receivingUserFriendsRequests.RequestUserIds.push(askingUserId);
        await receivingUserFriendsRequests.save();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const removeFriendRequestByUserId = async (req, res) => {
    try {
        const askingUserId = req.body.askingUserId;
        const receivingUserId = req.body.receivingUserId;
        const receivingUserFriendsRequests = await FriendsRequests.findOne({UserId: receivingUserId});
        if (!receivingUserFriendsRequests) {
            res.sendStatus(404);
        } else {
            receivingUserFriendsRequests.RequestUsersIds.remove(askingUserId);
            await receivingUserFriendsRequests.save();
            res.sendStatus(200);
        }
    } catch {
        res.sendStatus(500);
    }
}