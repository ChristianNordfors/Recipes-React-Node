import axios from "axios";

const URL = 'http://localhost:3001/recipes'

export const getRecipesByName = async (name) => {
    return await axios.get(`${URL}?name=${name}`);
};

export const getRecipe = async (id) => {
    return await axios.get(`${URL}/recipe/${id}`)
};

export const createRecipe = async (recipe) => {
    return await axios.post(`${URL}/recipe`, recipe);
};

export const getRecipes = async (page) => {
    return await axios.get(`${URL}` + (page ? `?page=${page}` : ''));
};

export const getRecipesOrder = async (page = '0', order) => {
    return await axios.get(`${URL}?page=${page}&order=${order}`);
};


