import Post from "../models/Post.mjs";
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');

export const getMusicalEntityPosts = async (req, res) => {
    try {
        const posts = await Post.find({"musicalEntity.id": req.params.musicalEntityId});
        if (!posts) {
            res.sendStatus(404);
            return;
        }
        res.status(200).send(posts);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

export const getUserPosts = async (req, res) => {
    const sort = {}
    if (req.query.orderby == 'createdat_desc') {
        sort.createdAt = -1
    }

    const userPosts = await Post.find({userId: req.params.id}).sort(sort);
    if (!userPosts) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(userPosts);
}

export const getPosts = async (req, res) => {
    try {
        const query = {};

        const sort = {};
        if (req.query.orderby == 'createdat_desc') {
            sort.createdAt = -1
        }

        const userPosts = await Post.find(query).sort(sort)
        res.status(200).send(userPosts);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

export const createNewPost = async (req, res) => {
    try {
        req.body.createdAt = new Date();
        const createdPost = await Post.create(req.body);
        await fs.appendFile(logsFilePath, `Post ${createdPost._id} created by ${createdPost.userId} on ${createdPost.musicalEntity.type} ${createdPost.musicalEntity.id}\n`)
        res.status(200).send(createdPost._id);
    } catch (error) {
        console.error(error)
        if (error.name === 'ValidationError') {
            res.status(400).send(error.message);
            return;
        }
        res.status(500).send(error.message);
    }

};
export const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.postId);
        if (!deletePost) {
            res.sendStatus(404);
            return;
        }
        await fs.appendFile(logsFilePath, `Post ${deletedPost._id} deleted\n`)
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

export const deletePosts = async (req, res) => {
    try {
        const query = {}
        if (req.query.userId !== undefined) {
            query.userId = req.query.userId;
        }
        if (req.query.musicalEntityId !== undefined) {
            query['musicalEntity.id'] = req.query.musicalEntityId;
        }
        const deleteResult = await Post.deleteMany(query);
        await fs.appendFile(logsFilePath, `Deleted ${deleteResult.deletedCount} posts\n`)
        res.status(200).send(`Matched ${deleteResult.n} documents, deleted ${deleteResult.deletedCount} documents`);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}