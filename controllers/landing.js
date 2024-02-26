const Sequelize = require("sequelize");
const db = require('../models');

/**
 * render to landing page
 * @param req
 * @param res
 * @param next
 */
exports.getLanding=(req,res, next)=>{
    res.render('landingPage');
}

