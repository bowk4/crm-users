import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'
import React from "react"
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
