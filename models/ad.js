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
        title: DataTypes.STRING,
        description: {
            type: DataTypes.STRING,
            allowNull: false, // constraint level validation (SQL level validation)
            validate: { // sequelize level validation
                isAlpha: true,
            }
        },
        price: {
            type: DataTypes.STRING,
            validate: { // sequelize level validation
                isNumeric: true,
            }},
        phone: {
            type: DataTypes.STRING,
            validate: { // sequelize level validation
                isNumeric: true,
            }},
        email: {
            type: DataTypes.STRING,
            unique: true,
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
