import FriendsRequests from '../models/FriendsRequests.mjs';

export const getFriendsRequestsByUserId = async (req, res) => {
    try {
        const userFriendsRequests = await FriendsRequests.findOne({UserId: req.params.userId});
        res.status(200).send(userFriendsRequests.RequestUsersIds);
    } catch {
        res.send([]);
    }
}

export const addFriendRequestByUserId = async (req, res) => {
    try {   
        const askingUserId = req.body.askingUserId;
        const receivingUserId = req.body.receivingUserId;
        let receivingUserFriendsRequests = await FriendsRequests.findOne({UserId: receivingUserId});
        
        if (receivingUserFriendsRequests===null){
            receivingUserFriendsRequests.RequestUsersIds = [];
        }
        
        receivingUserFriendsRequests.RequestUsersIds.push(askingUserId);
        await receivingUserFriendsRequests.save();
       
    } catch {
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