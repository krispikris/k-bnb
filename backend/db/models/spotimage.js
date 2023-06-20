'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    static associate(models) {
      // ONE-TO-MANY
      SpotImage.belongsTo(models.Spot,  { foreignKey: 'spotId', onDelete: 'CASCADE' });
    }
  }

  SpotImage.init({
    spotId: {
      type: DataTypes.INTEGER
    },

    url: {
      type: DataTypes.STRING
    },

    preview: {
      type: DataTypes.BOOLEAN
    }
  }, {

    sequelize,
    modelName: 'SpotImage',
  });

  return SpotImage;
};
