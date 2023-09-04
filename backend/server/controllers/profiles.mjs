import Profile from "../models/Profile.mjs";
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');

export const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).send(profiles);
    } catch {
        res.sendStatus(400);
    }
}

export const getProfileByUserId = async (req, res) => {
    try {
        const profile = await Profile.findOne({UserId: req.params.userId});
        res.status(200).send(profile);
    } catch {
        res.sendStatus(400);
    }
}

export const addProfile = async (req, res) => {
    try {
        const createdProfile = await Profile.create(req.body);
        await fs.appendFile(logsFilePath, `Created profile ${createdProfile._id} for user ${req.body.UserId}\n`)
        res.status(200).send(createdProfile._id);
    } catch {
        res.sendStatus(400);
    }
}

export const getUsersProfileBoxInfo = async (req, res) => {
    try {
        let profiles;
        if (req.query.ids === undefined) {
            profiles = await Profile.find();

        } else {
            const userIds = req.query.ids.split(',');
            profiles = await Promise.all(userIds.map(async userId =>
                await Profile.findOne({"UserId": userId})
            ))
        }
        const profilesBoxes = profiles.map(profile => {
            return {
            UserId: profile.UserId,
            FirstName: profile.FirstName,
            LastName: profile.LastName
        }});
        res.status(200).send(profilesBoxes);
    } catch (error){
        console.log(error)
        res.sendStatus(400);
    }
}

export const getUserProfileBoxInfoById = async (req, res) => {
    const userId = req.params.userId;
    const profile = await Profile.findOne({"UserId": userId});
    const profileBox =  {
        UserId: profile.UserId,
        FirstName: profile.FirstName,
        LastName: profile.LastName
    }
    res.status(200).send(profileBox);
}