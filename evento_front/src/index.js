import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { RouterProvider } from 'react-router-dom'
import router from './router';
import { ContextProvider } from './contexts/ContextProvider.jsx'


ReactDOM.render(
    <React.StrictMode>
        <ContextProvider>
        <RouterProvider router={router} />
        </ContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
