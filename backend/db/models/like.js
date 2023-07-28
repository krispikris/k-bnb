'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        static associate(models) {
            // ONE-TO-MANY
            Like.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
            Like.belongsTo(models.Spot, { foreignKey: 'spotId', onDelete: 'CASCADE' });
        }

    }
    Like.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        spotId: {
            type: DataTypes.INTEGER
        },

        userId: {
            type: DataTypes.INTEGER
        }
    }, {

        sequelize,
        modelName: 'Like',
    });

    return Like;
};
