import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MusicshareRouter from './MusicshareRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = MusicshareRouter();
root.render(router);

