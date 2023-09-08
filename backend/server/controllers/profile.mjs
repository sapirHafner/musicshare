import Profile from "../models/Profile.mjs";
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');

export const getProfiles = async (req, res) => {
    try {
        const query = {};
        if (req.query.ids !== undefined) {
            query.userId = {$in: req.query.ids.split(',')}
        }
        const profiles = await Profile.find(query);
        if (req.query.box === "true") {
            const profilesBoxes = profiles.map(profile => {
                return {
                    userId: profile.userId,
                    firstName: profile.firstName,
                    lastName: profile.lastName
            }});
            res.status(200).send(profilesBoxes);
            return;
        }
        res.status(200).send(profiles);
    } catch {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const getProfileByUserId = async (req, res) => {
    try {
        const profile = await Profile.findOne({userId: req.params.userId});
        if (!profile) {
            res.sendStatus(404);
            return
        }
        if (req.query.box === "true") {
            res.status(200).send({
                userId: profile.userId,
                firstName: profile.firstName,
                lastName: profile.lastName
            });
            return;
        }
        res.status(200).send(profile);
    } catch {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const addProfile = async (req, res) => {
    try {
        const emailExists = await Profile.exists({email: req.body.email});
        if (emailExists) {
            res.status(409).send('Email already exists');
            return;
        }
        const createdProfile = await Profile.create(req.body);
        await fs.appendFile(logsFilePath, `Created profile ${createdProfile._id} for user ${req.body.userId}\n`)
        res.status(200).send(createdProfile._id);
    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            res.status(400).send(error.message);
            return;
        }
        res.status(500).send(error.message);
    }
}

export const deleteProfile = async (req, res) => {
    try {
        const deletedProfile = await Profile.findOneAndDelete({userId: req.params.userId});
        if (!deletedProfile) {
            res.sendStatus(404);
            return;
        }
        await fs.appendFile(logsFilePath, `Delete user ${userId} profile\n`)
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}