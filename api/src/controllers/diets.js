const { Diet } = require('../db.js');


const list = async (req, res) => {

    try {
        const diets = await Diet.findAll();
        return res.json({
            ok: true,
            diets
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al listar los tipos de dietas'
        });
    }

};

module.exports = {
    list
}