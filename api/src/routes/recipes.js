const { Router } = require('express');
const router = Router();

const { list, create, getRecipe } = require('../controllers/recipes');


router.get('/', list);
router.get('/recipe/:recipeId', getRecipe);
router.post('/recipe', create);


module.exports = router;