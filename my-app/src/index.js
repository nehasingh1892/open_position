import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './css/myApp.css';
import './css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './Reducers/index';
import getOpenPositions from './components/DashboardComponent'
import createSagaMiddleware from 'redux-saga';
import mySaga from './Sagas/TestSaga/saga';



// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

/*import createSagaMiddleware from 'redux-saga'


import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import account from './account';

const reducer = combineReducers({
  account,
  form: reduxFormReducer, // mounted under "form"
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

export default store;

/*
const sagaMiddleware = createSagaMiddleware()
*/

const store = createStore(
    reducers,
    (applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(mySaga);


//store.dispatch(getOpenPositions);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,document.getElementById('root'));

registerServiceWorker();
