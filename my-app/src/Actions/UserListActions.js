import {DISPLAY_USERS} from './actionTypes';

const getAllUserDetails =(data) =>{
    return {
        type: DISPLAY_USERS,
        data
    }
}

export default getAllUserDetails;
