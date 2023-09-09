import axios from 'axios';
import { baseServerUrl } from './serverFunctions';

const featureFlagServerUrl = `${baseServerUrl}/featureFlag`

export const getFeatureFlag = async (name) =>
    (await axios.get(`${featureFlagServerUrl}/${name}`)).data.active;

export const getFeatureFlags = async (name) =>
    (await axios.get(featureFlagServerUrl)).data;

export const createFeatureFlag = async (featureFlag) =>
    (await axios.post(featureFlagServerUrl, featureFlag)).data;

export const updateFeatureFlag = async (featureFlag) =>
    await axios.put(featureFlagServerUrl, featureFlag);

export const deleteFeatureFlag = async (name) => {
    return await axios.delete(`${featureFlagServerUrl}/${name}`);
}
