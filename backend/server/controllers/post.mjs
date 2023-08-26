import Post from "../models/Post.mjs";

export const getPostByPostId = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        res.status(200).send(post);
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
};

export const getPosts = async (req, res) => {
    try {
        const query = {};
        const userIds = req.query.userIds;
        if (userIds !== undefined) {
            query.UserId = {$in: userIds}
        }

        const sort = {};
        const order = req.query.orderby;
        if (order == 'createdat_desc') {
            sort.CreatedAt = -1
        }

        const userPosts = await Post.find(query).sort(sort);
        res.status(200).send(userPosts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const createNewPost = async (req, res) => {
    try {
        const post = req.body;
        post.CreatedAt = new Date();
        const createdPost = await Post.create(post);
        res.status(200).send(createdPost._id);
    } catch (error) {
        res.sendStatus(400);
    }

};
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        await Post.findByIdAndDelete(postId);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
};