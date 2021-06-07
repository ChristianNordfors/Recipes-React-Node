const { Router } = require('express');
const router = Router();

const { list } = require('../controllers/diets');


router.get('/types', list);





module.exports = router;
