const User = require("../models/User");

const getUser = async (req, res) => {
    try {
        const user = await User.findOne(req.query);
        res.status(200).send({
            Id: user._id,
            Type: user.Type
        });
    } catch {
        res.sendStatus(400);
    }
}

const addUser = async (req, res) => {
    try {
        const isUserExists = await User.exists({Username: req.body.Username});
        if (isUserExists) {
            res.sendStatus(404);
        } else {
            await User.create(req.body)
            const createdUser = await User.findOne(req.body);
            res.status(200).send(createdUser._id);
        }
    } catch (error) {
        res.sendStatus(400);
    }
}

module.exports = { getUser, addUser };