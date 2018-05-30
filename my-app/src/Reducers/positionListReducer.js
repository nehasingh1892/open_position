
import {DISPLAY_POSITIONS} from "../Actions/actionTypes";

const  positionListReducer  = (state = [], action) => {

    switch(action.type) {
        case DISPLAY_POSITIONS:
            return [...action.data]
        default:
            return state;
    }
}

export default positionListReducer;