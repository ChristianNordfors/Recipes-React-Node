const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    spoonacularScore: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100
      }
    },
    healthScore: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100
      }
    },
    vegetarian: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    vegan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    glutenFree: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
    analyzedInstructions: DataTypes.ARRAY(DataTypes.JSON, 
        {steps: DataTypes.ARRAY(DataTypes.JSON, {
          number: DataTypes.INTEGER,
          step: DataTypes.STRING
        })}
      )
  });
};


