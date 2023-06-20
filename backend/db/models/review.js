'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // ONE-TO-MANY (3x)
      Review.belongsTo(models.User,           { foreignKey: 'userId',   onDelete: 'CASCADE' });
      Review.belongsTo(models.Spot,           { foreignKey: 'spotId',   onDelete: 'CASCADE' });
      Review.hasMany(models.ReviewImage,      { foreignKey: 'reviewId', onDelete: 'CASCADE' });
    }
  }

  Review.init({
    userId: {
      type: DataTypes.INTEGER
    },

    spotId: {
      type: DataTypes.INTEGER
    },

    review: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 256]
      }
    },

    stars: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 1,
        max: 5
      }
    }

  }, {

    sequelize,
    modelName: 'Review',
  });

  return Review;
};
