import express from 'express';
import {
    getFeatureFlagByName,
    getFeatureFlags,
    createFeatureFlag,
    updateFeatureFlag,
    deleteFeatureFlag
} from '../controllers/featureflags.mjs';

const router = express.Router();
router.get('/featureFlag/:name', getFeatureFlagByName);
router.get('/featureFlag', getFeatureFlags);
router.post('/featureFlag', createFeatureFlag);
router.put('/featureFlag', updateFeatureFlag);
router.delete('/featureFlag/:name', deleteFeatureFlag)

export default router;