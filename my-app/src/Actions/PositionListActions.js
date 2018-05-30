import React from 'react';
import {DISPLAY_POSITIONS} from './actionTypes';

const getAllOpenPositions =(data) =>{

    return {
        type: DISPLAY_POSITIONS,
        data
    }
}

export default getAllOpenPositions;