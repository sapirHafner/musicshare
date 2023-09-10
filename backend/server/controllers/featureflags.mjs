import FeatureFlag from "../models/FeatureFlag.mjs";
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');

export const getFeatureFlagByName = async (req, res) => {
    try {
        const featureFlag = await FeatureFlag.findOne({name: req.params.name})
        if (!featureFlag) {
            res.status(404).send('Feature flag not found');
            return;
        }
        res.status(200).send(featureFlag);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message)
    }
}

export const getFeatureFlags = async (req, res) => {
    try {
        const query = {};
        if (req.query.names !== undefined) {
            query.name = {$in: req.query.names.split(',')}
        }
        const featureFlags = await FeatureFlag.find(query);
        res.status(200).send(featureFlags);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message)
    }
}

export const createFeatureFlag = async (req, res) => {
    try {
        const createdFeatureFlag = await FeatureFlag.create(req.body);
        await fs.appendFile(logsFilePath, `Feature flag ${createdFeatureFlag._id} created\n`)
        res.status(200).send(createdFeatureFlag._id);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            res.status(400).send(error.message);
            return;
        }
        res.status(500).send(error.message);
    }
}

export const updateFeatureFlag = async (req, res) => {
    try {
        const updatedFeatureFlag = await FeatureFlag.findOneAndUpdate({name: req.body.name}, {active: req.body.active});
        if (!updatedFeatureFlag) {
            res.status(404).send('Feature flag not found');
            return;
        }
        await fs.appendFile(logsFilePath, `Feature flag ${updatedFeatureFlag._id} updated\n`)
        res.sendStatus(200)
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            res.status(400).send(error.message);
            return;
        }
        res.status(500).send(error.message);
    }
}

export const deleteFeatureFlag = async (req, res) => {
    try {
        const deletedFeatureFlag = await FeatureFlag.findOneAndDelete({name: req.params.name});
        if (!deletedFeatureFlag) {
            res.status(404).send('Feature flag not found');
            return;
        }
        await fs.appendFile(logsFilePath, `Feature flag ${deletedFeatureFlag._id} deleted\n`)
        res.sendStatus(200)
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

