import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, compose, applyMiddleware} from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './store/reducers';
import thunk from "redux-thunk";


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const myStore = createStore( rootReducer, composeEnhances(
    applyMiddleware(thunk)
) );

// myStore.subscribe(() => console.log(myStore.getState()))


const app = (
    <Provider store={myStore}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
