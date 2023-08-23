const Post = require("../models/Post");

const getPostByPostId = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        res.status(200).send(post);
    }
    catch (error) {
        res.sendStatus(400);
    }
};
const getUserPostsByUserIdSortedByTimeDesc = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userPosts = await Post.find({
            UserId: userId
        }).sort({Time: -1});
        res.status(200).send(userPosts);
    } catch (error) {
        res.sendStatus(400);
    }
};
const createNewPost = async (req, res) => {
    try {
        const post = req.body;
        post.Time = new Date();
        await Post.create(post);
        res.status(200);
    } catch (error) {
        res.status(400);
    }

};
const deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        await Post.findByIdAndDelete(postId);
        res.status(200);
    } catch (error) {
        res.status(400);
    }
};

module.exports = {
    getPostByPostId,
    getUserPostsByUserIdSortedByTimeDesc,
    createNewPost,
    deletePost,
}