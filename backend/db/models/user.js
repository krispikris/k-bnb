'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    toSafeObject() {
      const { id, firstName, lastName, email, username } = this;
      return { id, firstName, lastName, email, username };
    };

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    };

    static getCurrentUserById(id) {
      return User.scope('currentUser').findByPk(id);
    };

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });

      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    };

    static async signup({ firstName, lastName, username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        email,
        username,
        hashedPassword
      });

      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      // ONE TO MANY
      User.hasMany(models.Spot, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
      User.hasMany(models.Review, { foreignKey: 'userId' });
      User.hasMany(models.Booking, { foreignKey: 'bookingId' });
      User.hasMany(models.Like, { foreignKey: 'likeId' });


    }

  };

  // // MANY TO MANY
  // User.belongsToMany(models.Spot,   { through:    models.Review,
  //                                     foreignKey: 'userId',
  //                                     otherKey:   'spotId',
  //                                     onDelete:   'CASCADE' });

  // User.belongsToMany(models.Spot,   { through:    models.Booking,
  //                                     foreignKey: 'userId',
  //                                     otherKey:   'spotId',
  //                                     onDelete:   'CASCADE' });

  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // unique: { msg: 'emailVal' }
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // unique: { msg: 'usernameVal' }
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email');
          }
        }
      }
    },

    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },

    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'createdAt', 'updatedAt']
        }
      },

      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword', 'createdAt', 'updatedAt'] }
        },
        loginUser: {
          attributes: {}
        }
      }
    });

  return User;
};
