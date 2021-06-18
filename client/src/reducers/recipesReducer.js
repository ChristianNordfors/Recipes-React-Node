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
            const query = new URLSearchParams(window.location.search);
            const name = query.get('name') || '';

            let filteredA = [];

            if (name) {
                state.recipesSearchByName?.forEach(rd => {
                    rd.diets.filter(d => {
                        if (!d.hasOwnProperty('name') ? d === action.payload.toLowerCase() : d.name === action.payload.toLowerCase()) {
                        return filteredA.push(rd);
                        } else {
                            return ''
                        }
                    })
                })
            } else {
                state.recipesLoaded.recipes.forEach(rd => {
                    rd.diets.filter(d => {
                        if (!d.hasOwnProperty('name') ? d === action.payload.toLowerCase() : d.name === action.payload.toLowerCase()) {
                            return filteredA.push(rd);
                        } else {
                            return ''
                        }
                    })
                })
            }

            // let filteredFinal = new Set([...filteredA, ...filteredB])

            // filteredFinal = [...filteredFinal]
            // filteredA = [];
            // filteredB = [];

            return {
                ...state,
                filtered: filteredA
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