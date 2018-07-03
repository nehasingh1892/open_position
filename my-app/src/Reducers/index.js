import { combineReducers } from 'redux'
import positionListReducer from '../Sagas/TestSaga/positionListReducer';
import userListReducer from '../Sagas/TestSaga/userListReducer';
import {reducer as formReducer} from 'redux-form';


const reducers = combineReducers({
    positions : positionListReducer,
    userDetails : userListReducer,
    form: formReducer,

})

export default reducers;
