'use strict';
//const { MAX_DESC, MAX_TITLE, MIN_PRICE } = require('/../config/consts.js');
const MAX_DESC = 200;
const MAX_TITLE = 20;
const MIN_PRICE = 0;

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
            notEmpty: false,
            validate: {
                len: [1, MAX_TITLE],
            }
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                len: [0,MAX_DESC],
            }
        },
        price: {
            type: DataTypes.STRING,
            notEmpty: false,
            validate: {
                isNumeric: true,
                min: MIN_PRICE,
            }},
      phone:
    {
        type: DataTypes.STRING,
        validate: {
        is:/^([0-9]{2}-[0-9]{7}|[0-9]{3}-[0-9]{7}|)$/
        }},
    email: {
        type: DataTypes.STRING,
        notEmpty: false,
         validate: {
            isEmail:true
         }
        //  isEmailCustom(value) {
        // Implement your custom email validation logic here
        //  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //   }
        //  }},
    },approved: {
        type: DataTypes.BOOLEAN,
            defaultValue: false,
    }}, {
    sequelize, // We need to pass the connection instance
    modelName: 'Ad',
});
return Ad;
};
