import { createRecipe, getRecipe, getRecipes, getRecipesByName, getRecipesOrder } from '../functions/recipes';
import { showNotification } from './notification';

import { FILTER_BY_DIETS, GET_RECIPE, GET_RECIPES, GET_RECIPES_BY_NAME, GET_RECIPES_ORDERED, CLEAN_FILTER_BY_DIETS } from './types';



export function startGetRecipes(page) {
    return function (dispatch) {
        return getRecipes(page)
            .then(({ data }) => {
                dispatch({ type: GET_RECIPES, payload: data });
            }).catch(error => {
                console.log(error.response, 'ASDASDSAD');
            });
    }
}

export function startGetRecipesByName(name) {
    return function (dispatch) {
        return getRecipesByName(name)
            .then(({ data }) => {
                dispatch({ type: GET_RECIPES_BY_NAME, payload: data.recipes });
            }).catch(error => {
                error.response.status = 404 && dispatch({ type: GET_RECIPES_BY_NAME, payload: [] });
                console.log(error, 'DDDD');
            });
    }
}

// export function startGetRecipe(recipeId) {
//     return function (dispatch) {
//         return getRecipe(recipeId)
//             .then(({ data }) => {
//                 dispatch({ type: GET_RECIPE, payload: data.recipe });
//             }).catch(error => {
//                 console.log(error);
//                 dispatch(showNotification('Recipe not found', 'danger'));
//             })
//     }
// }


export function startCreateRecipe(recipe) {
    return function (dispatch) {
        return createRecipe(recipe)
            .then(() => {
                dispatch(startGetRecipes());
                dispatch(showNotification('Recipe created'));
            }).catch(error => {
                console.log(error, 'BBBBBB');
                dispatch(showNotification('Recipe not created', 'danger'));
            });
    }
}


export function startGetRecipesOrder(page, order) {
    return function (dispatch) {
        return getRecipesOrder(page, order)
            .then(({ data }) => {
                dispatch({ type: GET_RECIPES_ORDERED, payload: data });
            }).catch(error => {
                console.log(error);
            });
    }
}


export function filterByDiets(diet) {
    return function (dispatch, getState) {
        const recipes = getState().recipes;

        const query = new URLSearchParams(window.location.search);
        const name = query.get('name') || '';

        let filteredA = [];

        (name ? recipes.recipesSearchByName : recipes.recipesLoaded.recipes).forEach(rd => {
            rd.diets.filter(d => {
                if (!d.hasOwnProperty('name') ? d === diet.toLowerCase() : d.name === diet.toLowerCase()) {
                    return filteredA.push(rd);
                } else {
                    return ''
                }
            })
        })

        // dispatch({ type: FILTER_BY_DIETS, payload: diet });
        dispatch({ type: FILTER_BY_DIETS, payload: filteredA });
    }
}

export function cleanFilterByDiets() {
    return function (dispatch) {
        dispatch({ type: CLEAN_FILTER_BY_DIETS, payload: [] });
    }
}

