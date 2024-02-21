'use strict';

const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Ad extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }
    Ad.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false, // constraint level validation (SQL level validation)
            validate: { // sequelize level validation
                isAlpha: true,
                len: [1, 20],
            }
        },
        description: {
            type: DataTypes.STRING,
            notEmpty: false,
            validate: { // sequelize level validation
                len: [0,200],
            }
        },
        price: {
            type: DataTypes.STRING,
            notEmpty: true,
            validate: { // sequelize level validation
                isNumeric: true,
                min: 0,
            }},
        phone: {
            type: DataTypes.STRING,
            notEmpty: false,
            validate: { // sequelize level validation
                //is: /^\d{3}-\d{7}$|^\d{2}-\d{7}$/
            }},
        email: {
            type: DataTypes.STRING,
            notEmpty: true,
            validate: { // sequelize level validation
                isEmail: true
            }},
        approved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }}, {
        sequelize, // We need to pass the connection instance
        modelName: 'Ad',
    });
    return Ad;
};
