const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    aggregateLikes: {
      type: DataTypes.BIGINT,
    },
    healthScore: {
      type: DataTypes.DECIMAL(10, 1)
    },
    instructions: {
      type: DataTypes.TEXT
    }
  });

};



