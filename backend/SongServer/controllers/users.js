const User = require("../models/User");

const getUserId = async (req, res) => {
    try {
        const user = await User.findOne(req.query);
        res.status(200).send(user._id);
    } catch {
        res.sendStatus(404);
    }
}

const addUser = async (req, res) => {
    try {
        const isUserExists = await User.exists({Username: req.body.Username});
        if (isUserExists) {
            res.sendStatus(400);
        } else {
            await User.create(req.body)
            const createdUser = await User.findOne(req.body);
            res.status(200).send(createdUser._id);
        }
    } catch (error) {
        res.sendStatus(404);
    }
}

module.exports = { getUserId, addUser };


//{
  //  "Username": "sapiri1921",
   // "Password": "8934123"
//}
