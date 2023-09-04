import express from 'express';
import { getAllLogs } from '../controllers/logs.mjs';

const router = express.Router();
router.get('/logs', getAllLogs);

export default router;