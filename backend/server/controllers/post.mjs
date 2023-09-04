import Post from "../models/Post.mjs";
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');

export const getMusicalEntityPosts = async (req, res) => {
    try {
        const musicalEntityId = req.params.musicalEntityId;
        const posts = await Post.find({"MusicalEntity.Id": musicalEntityId});
        res.status(200).send(posts);
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
        await fs.appendFile(logsFilePath, `Post ${createdPost._id} created by ${post.UserId} on ${post.MusicalEntity.Type} ${post.MusicalEntity.Id}\n`)
        res.status(200).send(createdPost._id);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }

};
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        await Post.findByIdAndDelete(postId);
        await fs.appendFile(logsFilePath, `Post ${createdPost._id} deleted\n`)
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
};