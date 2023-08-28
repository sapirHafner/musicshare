import FriendsApplicaton from '../models/FriendsRequests.mjs'

export const getFriendsApplicationsByUserId = async (req, res) => {
    try {
        const userFriendsApplications = await FriendsApplicaton.findOne({UserId: req.params.userId});
        res.status(200).send(userFriendsApplications.RequestUsersIds);
    } catch {
        res.sendStatus(404);
    }
}

export const addFriendRequestByUserId = async (req, res) => {
    try {
        const askingUserId = req.body.askingUserId;
        const receivingUserId = req.body.receivingUserId;
        const receivingUserFriendsRequests = await FriendsApplicaton.findOne({UserId: receivingUserId});
        if (!receivingUserFriendsRequests) {
            res.sendStatus(404);
        } else {
            receivingUserFriendsRequests.RequestUsersIds.push(askingUserId);
            await receivingUserFriendsRequests.save();
            res.sendStatus(200);
        }
    } catch {
        res.sendStatus(500);
    }
}

export const removeFriendRequestByUserId = async (req, res) => {
    try {
        const askingUserId = req.body.askingUserId;
        const receivingUserId = req.body.receivingUserId;
        const receivingUserFriendsRequests = await FriendsApplicaton.findOne({UserId: receivingUserId});
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