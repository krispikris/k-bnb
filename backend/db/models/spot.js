'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      // ONE-TO-MANY (4x)
      Spot.belongsTo(models.User,       { foreignKey: 'ownerId', as: 'Owner'});
      Spot.hasMany(models.SpotImage,    { foreignKey: 'spotId' });
      Spot.hasMany(models.Review,       { foreignKey: 'spotId' });
      Spot.hasMany(models.Booking,      { foreignKey: 'spotId' });

    }
  }

  Spot.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    ownerId: {
      type: DataTypes.INTEGER
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },

    lat: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },

    lng: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 256]
      }
    },

    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {

    sequelize,
    modelName: 'Spot',
  });

  return Spot;
};

// MANY-TO-MANY (2x)
// Spot.belongsToMany(models.User,   { through:    models.Review,
//                                     foreignKey: 'spotId',
//                                     otherKey:   'userId' });

// Spot.belongsToMany(models.User,   { through:    models.Booking,
//                                     foreignKey: 'spotId',
//                                     otherKey:   'userId',
//                                     onDelete:   'CASCADE' });

//  static async createSpot ({ address, city, state, country, lat, lng, name, description, price }) {
//   const spot = await Spot.create({
//     address,
//     city,
//     state,
//     country,
//     lat,
//     lng,
//     name,
//     description,
//     price
//   });
//   return await Spot.findByPk(spot.id)
//  }
// }
