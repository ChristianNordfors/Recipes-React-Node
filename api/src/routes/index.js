const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dietsRouter = require('./diets');
const recipesRouter = require('./recipes');



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/diets', dietsRouter);

// Recipes
router.use('/recipes', recipesRouter);





module.exports = router;
