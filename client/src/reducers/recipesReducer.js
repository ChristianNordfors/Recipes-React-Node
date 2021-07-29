import { FILTER_BY_DIETS, GET_RECIPES, GET_RECIPES_BY_NAME, GET_RECIPES_ORDERED, CLEAN_FILTER_BY_DIETS } from '../actions/types';

const initialState = {
    recipesLoaded: [],
    recipesSearchByName: [],
    filtered: [],
}


export default function recipesReducer(state = initialState, action) {

    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipesLoaded: action.payload
            }

        case GET_RECIPES_BY_NAME:
            return {
                ...state,
                recipesSearchByName: action.payload
            }

        case GET_RECIPES_ORDERED:
            return {
                ...state,
                recipesLoaded: action.payload
            }

        case FILTER_BY_DIETS:

            return {
                ...state,
                filtered: action.payload
            }

        case CLEAN_FILTER_BY_DIETS:

            return {
                ...state,
                filtered: action.payload
            }

        default:
            return state;
    }
}