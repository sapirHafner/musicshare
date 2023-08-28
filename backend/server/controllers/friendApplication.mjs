import FriendsApplicaton from "../models/FriendApplicaton.mjs";

export const getFriendsApplicationsByUserId = async (req, res) => {
    try {
        const userFriendsApplications = await FriendsApplicaton.findOne({UserId: req.params.userId});
        res.status(200).send(userFriendsApplications.Friends);
    } catch {
        res.sendStatus(404);
    }
}

export const addFriendRequestByUserId = async (req, res) => {
    try {
        const firstUserId = req.body.FirstUserId;
        const secondUserId = req.body.SecondUserId;
        const secondUserFriendsApplications = await FriendsApplicaton.findOne({UserId: secondUserId});
        if (!secondUserFriendsApplications) {
            res.sendStatus(404);
        } else {
            secondUserFriendsApplications.Friends.push(firstUserId);
            await secondUserFriendsApplications.save();
            res.sendStatus(200);
        }
    } catch {
        res.sendStatus(500);
    }
}

export const removeFriendRequestByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        await FriendsApplicaton.findByIdAndDelete(userId);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
}