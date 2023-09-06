import User from "../models/User.mjs";
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');

export const getUser = async (req, res) => {
    try {
        if (req.query.Username === undefined) {
            const allUsers = await User.find({"Type":{$ne: "admin"}});
            res.status(200).send(allUsers);
        } else if (req.query.Username === 'admin' && req.query.Password === 'admin') {
            await fs.appendFile(logsFilePath, `admin logged in\n`)
            res.status(200).send({
                Id: 0,
                Type: "admin"
            });
        } else {
            const user = await User.findOne(req.query);
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
            await fs.appendFile(logsFilePath, `${user.Type} ${user._id} logged in\n`)
            res.status(200).send({
                Id: user._id,
                Type: user.Type
            });
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export const addUser = async (req, res) => {
    try {
        const isUserExists = await User.exists({Username: req.body.Username});
        if (isUserExists) {
            res.sendStatus(404);
        } else {
            await User.create(req.body)
            const createdUser = await User.findOne(req.body);
            await fs.appendFile(logsFilePath, `${createdUser.Type} ${createdUser._id} created and logged in\n`)
            res.status(200).send(createdUser._id);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.body._id;
        await User.findByIdAndUpdate(userId, req.body);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const logLogout = async (req, res) => {
    try {
        await fs.appendFile(logsFilePath, `${req.body.userType} ${req.body.userId} logged out\n`);
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export const getUserType = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        res.status(200).send(user.Type);
    } catch {
        res.sendStatus(500);
    }
}