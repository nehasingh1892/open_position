
import {DISPLAY_USERS} from "../../Actions/actionTypes";


export const  userListReducer  = (state = {}, action) => {
    switch(action.type) {
        case DISPLAY_USERS:
            return action.data
        default:
            return state;
    }
}

export default userListReducer;