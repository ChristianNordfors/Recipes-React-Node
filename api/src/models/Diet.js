const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('diet', {
        name: DataTypes.STRING(20),
        description: DataTypes.TEXT,
    }, { timestamps: false });
};


