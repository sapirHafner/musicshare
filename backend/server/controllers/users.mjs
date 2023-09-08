import User from "../models/User.mjs";
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');

export const getUsers = async (req, res) => {
    try {
        const query = {};
        res.status(200).send(await User.find(query));
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404);
        }
        res.status(200).send({
            username: user.username,
            type: user.type,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const validateUser = async (req, res) => {
    try {
        if (req.body.username === 'admin' && req.body.password === 'admin') {
            await fs.appendFile(logsFilePath, `admin logged in\n`)
            res.status(200).send({
                id: 0,
                type: "admin"
            });
            return;
        }
        const user = await User.findOne(req.body);
        if (!user) {
            res.sendStatus(404);
            return;
        }
        await fs.appendFile(logsFilePath, `${user.type} ${user._id} logged in\n`)
        res.status(200).send({
            id: user._id,
            type: user.type
        });
    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            res.status(400).send(error.message);
            return;
        }
        res.status(500).send(error.message);
    }
}


export const addUser = async (req, res) => {
    try {
        const userExists = await User.exists({username: req.body.username});
        if (userExists) {
            res.status(409).send('User already exists')
            return;
        }
        const createdUser = await User.create(req.body)
        await fs.appendFile(logsFilePath, `${createdUser.type} ${createdUser._id} created and logged in\n`)
        res.status(200).send(createdUser._id);
    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            res.status(400).send(error.message);
            return;
        }
        res.status(500).send(error.message);
    }
}

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.body._id, req.body);
        if (!updatedUser) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const logLogout = async (req, res) => {
    try {
        await fs.appendFile(logsFilePath, `${req.body.userType} ${req.body.userId} logged out\n`);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
