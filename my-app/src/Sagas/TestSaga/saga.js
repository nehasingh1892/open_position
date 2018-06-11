import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {getAllUserDetails1} from './testAction';
import {DISPLAY_POSITIONS} from '../../Actions/actionTypes';

console.log("into saga file");
//import Api from '...'

let defaultState = {
    message: 'has not run'
}

// worker Sagas: will be fired on DISPLAY_POSITIONS actions
function* fetchPosition(action) {
    try {
        const user = yield call(getAllUserDetails1, action.payload.userDetails);
        yield put({type: "DISPLAY_POSITIONS_FETCH_SUCCEEDED", data: user});
    } catch (e) {
        yield put({type: "DISPLAY_POSITIONS_FETCH_FAILED", message: e.message});
    }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
    yield takeEvery(DISPLAY_POSITIONS, fetchPosition);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
    yield takeLatest(DISPLAY_POSITIONS, fetchPosition);
}

export default mySaga;