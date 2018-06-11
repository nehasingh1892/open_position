import {DISPLAY_USERS} from '../../Actions/actionTypes';

export const getAllUserDetails1 =(data) =>{
// debugger;
    return {
        type: DISPLAY_USERS,
        data
    }
};

export default getAllUserDetails1;