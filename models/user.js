'use strict';

const { DataTypes, Model } = require('sequelize');
const db = require("./index");

module.exports = (sequelize) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }
    User.init({
        userName: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            allowNull: false, // constraint level validation (SQL level validation)
            validate: { // sequelize level validation
            }
        },

    }, {
        sequelize, // We need to pass the connection instance
        modelName: 'User',
    });


    return User;
};
