import axios from 'axios';
import { baseServerUrl } from './serverFunctions';

const logsServerUrl = `${baseServerUrl}/logs`

export const fetchAllLogs = async () =>
    (await axios.get(logsServerUrl)).data;

