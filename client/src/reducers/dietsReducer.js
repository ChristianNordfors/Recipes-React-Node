import { GET_DIETS } from '../actions/types';

const initialState = {
    dietsLoaded: []
}


export default function dietsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DIETS:
            return {
                ...state,
                dietsLoaded:  action.payload 
            }


        default:
            return state;
    }
}