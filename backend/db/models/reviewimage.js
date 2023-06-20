'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    static associate(models) {
      // ONE-TO-MANY
      ReviewImage.belongsTo(models.Review,   { foreignKey: 'reviewId', onDelete: 'CASCADE' });
    }
  }

  ReviewImage.init({
    reviewId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });

  return ReviewImage;
};
