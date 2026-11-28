import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {loadPersistedState} from './store';
import './styles.css';
import './ascii.css';
import './ascii-ui.css';
loadPersistedState().then(initialState => createRoot(document.getElementById('root')).render(<App initialState={initialState}/>));
