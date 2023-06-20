'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // ONE-TO-MANY
      Booking.belongsTo(models.User,  { foreignKey: 'userId', onDelete: 'CASCADE' });
      Booking.belongsTo(models.Spot,  { foreignKey: 'spotId', onDelete: 'CASCADE' });
    }

  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER
    },

    userId: {
      type: DataTypes.INTEGER
    },

    startDate: {
      type: DataTypes.DATEONLY      // Sequelize.DATE
    },

    endDate: {
      type: DataTypes.DATEONLY,    // Sequelize.DATE
      validate: {
        isValid(checkoutDate) {
          if (checkoutDate <= this.startDate) throw new Error();
        }
      }
    }
  }, {

    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};
