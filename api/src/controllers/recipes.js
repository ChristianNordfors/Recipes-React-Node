const { default: axios } = require('axios');
const { Recipe, Diet } = require('../db');
const { API_KEY } = process.env;

const list = async (req, res) => {

    const { name, order } = req.query;

    try {
        const recipesCustom = await Recipe.findAll({
            include: { model: Diet },
            order: [
                ['createdAt', 'DESC']
            ]
        });

        // const { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100`);

        // const recipesSpoonacular = data.results;

        // let recipesTotal = await Promise.all([recipesCustom]);

        // recipesTotal = recipesTotal[0];

        let recipesTotal = [...recipesCustom];


        if (name) {
            let filteredRecipes = recipesTotal.filter(recipe => recipe.title.toLowerCase().includes(name.toLowerCase()));
            filteredRecipes = filteredRecipes.slice(0, 9);

            if (!filteredRecipes.length) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No se encontraron recetas'
                })
            }

            return res.status(200).json({
                ok: true,
                recipes: filteredRecipes
            });


        } else {

            switch (order) {
                case 'A-z':
                    // recipesTotal.sort((a, b) => a.title < b.title ? - 1 : Number(a.title > b.title))
                    recipesTotal.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? - 1 : a.title.toLowerCase() > b.title.toLowerCase());
                    break;
                case 'Z-a':
                    recipesTotal.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? - 1 : a.title.toLowerCase() < b.title.toLowerCase());
                    break;
                case 'Min score':
                    recipesTotal.sort((a, b) => a.spoonacularScore - b.spoonacularScore);
                    break;
                case 'Max score':
                    recipesTotal.sort((a, b) => b.spoonacularScore - a.spoonacularScore);
                    break;
            }

            // if (order === 'A-z') {
            //     recipesTotal.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? - 1 : a.title.toLowerCase() > b.title.toLowerCase());
            // }
            // if (order === 'Z-a') {
            //     recipesTotal.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? - 1 : a.title.toLowerCase() < b.title.toLowerCase());
            // }
            // if (order === 'Min score') {
            //     recipesTotal.sort((a, b) => a.spoonacularScore - b.spoonacularScore);
            // }
            // if (order === 'Max score') {
            //     console.log('MAX');
            //     recipesTotal.sort((a, b) => b.spoonacularScore - a.spoonacularScore);
            // }


            let page = Number(req.query.page) || 0;

            let from = page * 10;

            let recipesPaginated = recipesTotal.slice(from, from + 10)


            return res.status(200).json({
                ok: true,
                page,
                recipes: recipesPaginated,
                number: recipesPaginated.length,
                total: recipesTotal.length
            });
        }

    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al listar las recetas',
            error
        });
    }

};




// const list = async (req, res) => {

//     const { name, order } = req.query;

//     try {
//         const recipesCustom = await Recipe.findAll({
//             include: { model: Diet },
//             order: [
//                 ['createdAt', 'DESC']
//             ]
//         });
//         const { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=3&addRecipeInformation=true`);

//         const recipesSpoonacular = data.results;

//         const recipesTotal = [...recipesCustom, ...recipesSpoonacular];

//         if (name) {
//             let filteredRecipes = recipesTotal.filter(recipe => recipe.title.toLowerCase().includes(name.toLowerCase()));
//             filteredRecipes = filteredRecipes.slice(0, 9);

//             if (!filteredRecipes.length) {
//                 return res.json({
//                     ok: false,
//                     msg: 'No se encontraron recetas'
//                 })
//             }

//             return res.json({
//                 ok: true,
//                 recipes: filteredRecipes
//             });

//         } else {

//             switch (order) {
//                 case 'A-z':
//                     // recipesTotal.sort((a, b) => a.title < b.title ? - 1 : Number(a.title > b.title))
//                     recipesTotal.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? - 1 : a.title.toLowerCase() > b.title.toLowerCase());
//                     break;
//                 case 'Z-a':
//                     recipesTotal.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? - 1 : a.title.toLowerCase() < b.title.toLowerCase());
//                     break;
//                 case 'Min score':
//                     recipesTotal.sort((a, b) => a.spoonacularScore - b.spoonacularScore);
//                     break;
//                 case 'Max score':
//                     recipesTotal.sort((a, b) => b.spoonacularScore - a.spoonacularScore);
//                     break;
//             }


//             let page = Number(req.query.page) || 0;

//             let from = page * 10;

//             let recipesPaginated = recipesTotal.slice(from, from + 10)

//             return res.json({
//                 ok: true,
//                 page,
//                 recipes: recipesPaginated,
//                 number: recipesPaginated.length,
//                 total: recipesTotal.length
//             });
//         }

//     } catch (error) {
//         console.log(error);
//         return res.json({
//             ok: false,
//             msg: 'Ocurrió un error al listar las recetas'
//         });
//     }

// };


const create = async (req, res) => {

    const recipe = req.body;

    try {

        if (!recipe.title || !recipe.summary) return res.status(400).json({ ok: false, msg: 'El nombre y el resumen son obligatorios' });

        const recipeCreated = await Recipe.create({ ...recipe });

        recipeCreated.setDiets(recipe.diets);

        return res.status(201).json({
            ok: true,
            recipe: recipeCreated
        });

    } catch ({ errors }) {
        // console.log(errors);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al intentar crear la receta'
        })
    }
};


const getRecipe = async (req, res) => {

    const { recipeId } = req.params;

    let searchedRecipe;
    try {

        if (recipeId.includes('_cstm') && recipeId.length > 10) {

            searchedRecipe = await Recipe.findByPk(recipeId, {
                include: { model: Diet }
            });

        } else {
            const { data } = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`);
            searchedRecipe = data;
        }

        if (!searchedRecipe) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró una receta con ese ID',
            });
        }
        return res.json({
            ok: true,
            recipe: searchedRecipe
        });

    } catch (error) {
        // console.log(error.response.status);
        return res.status(error.response.status).json({
            ok: false,
            msg: 'Ocurrió un error al buscar la receta',
            error
        });
    }
};


module.exports = {
    list,
    create,
    getRecipe
}