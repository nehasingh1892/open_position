import { combineReducers } from 'redux'
import positionListReducer from './positionListReducer';
import userListReducer from './userListReducer';
import {reducer as formReducer} from 'redux-form';

/*import { reducer as testSaga } from '../sagas/testSaga/reducer'*/


const Reducer = combineReducers({
    positions : positionListReducer,
    userDetails : userListReducer,
    /*testSaga,*/
    form: formReducer
})

export default Reducer;
