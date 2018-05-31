import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './css/myApp.css';
import './css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './Reducers/index';
import getOpenPositions from './components/DashboardComponent'
/*import createSagaMiddleware from 'redux-saga'

import sagas from './sagas'*/


/*
const sagaMiddleware = createSagaMiddleware()
*/


const store = createStore(
    reducer
    /*,
    (applyMiddleware(sagaMiddleware))*/
);

/*
sagaMiddleware.run(sagas)
*/

//store.dispatch(getOpenPositions);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,document.getElementById('root'));

registerServiceWorker();
