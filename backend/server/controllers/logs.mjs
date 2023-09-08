import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const moduleFilePath = fileURLToPath(import.meta.url);
const logsFilePath = path.join(path.dirname(moduleFilePath), '../logs.txt');

export const getAllLogs = async (req, res) => {
    const data = (await fs.readFile(logsFilePath, 'utf8')).replace(/\n/g, ',');
    res.status(200).send(data);
}