import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import store from './store';
Amplify.configure(config);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
