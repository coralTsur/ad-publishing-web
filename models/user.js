'use strict';

const { DataTypes, Model } = require('sequelize');
const db = require("./index");

module.exports = (sequelize) => {
    class User extends Model { }

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
