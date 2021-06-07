const { default: axios } = require('axios');
const { Recipe, Diet } = require('../db');
const { API_KEY } = process.env;

const list = async (req, res) => {
    // https://api.spoonacular.com/recipes/complexSearch
    // &addRecipeInformation=true
    const { name } = req.query;

    try {
        // let page = req.query.page || 0;
        const recipesCustom = await Recipe.findAll({ include: { model: Diet } });
        const { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100`);

        const recipesSpoonacular = data.results;

        const recipesTotal = [...recipesCustom, ...recipesSpoonacular];

        if (name) {
            let filteredRecipes = recipesTotal.filter(recipe => recipe.title.toLowerCase().includes(name.toLowerCase()));
            filteredRecipes = filteredRecipes.slice(0, 9);

            if (!filteredRecipes.length) {
                return res.json({
                    ok: false,
                    msg: 'No se encontraron recetas'
                })
            }

            return res.json({
                ok: true,
                recipes: filteredRecipes
            });

        } else {
            let page = Number(req.query.page) * 10 || 0;

            let recipesPaginated = recipesTotal.slice(page, page + 10)

            return res.json({
                ok: true,
                recipes: recipesPaginated,
                number: recipesPaginated.length,
                totalPages: recipesTotal.length
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Ocurrió un error al listar las recetas'
        });
    }

};


const create = async (req, res) => {

    const { title, summary, aggregateLikes, healthScore, instructions, diets } = req.body;

    try {

        if (!title || !summary) return res.json({ ok: false, msg: 'El nombre y el resumen son obligatorios' });

        const recipeCreated = await Recipe.create({ title, summary, aggregateLikes, healthScore, instructions });

        recipeCreated.setDiets(diets);

        return res.json({
            ok: true,
            recipe: recipeCreated
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al intentar crear la receta'
        })
    }
};


const getRecipe = async (req, res) => {

    const { recipeId } = req.params;

    try {

        let searchedRecipe;

        if (recipeId.includes('_cstm') && recipeId.length > 15) {

            searchedRecipe = await Recipe.findByPk(recipeId, {
                include: { model: Diet }
            });

        } else {

            const { data } = await axios.get(`https://api.spoonacular.com/recipes/716426/information?apiKey=${API_KEY}`);
            searchedRecipe = data;
            console.log(searchedRecipe);
        }

        if (!searchedRecipe) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró una receta con ese ID',
                searchedRecipe
            });
        }

        return res.json({
            ok: true,
            recipe: searchedRecipe
        });

    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Ocurrió un error al buscar la receta'
        });
    }
};


module.exports = {
    list,
    create,
    getRecipe
}