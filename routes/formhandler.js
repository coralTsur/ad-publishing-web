const express = require('express');
const Cookies = require('cookies');
const Sequelize = require('sequelize');
const db = require('../models');

const router = express.Router();
const keys = ['keyboard cat'];

// Middleware for the first '/add' route
const handleAddRoute1 = (req, res, next) => {
    const { title, description, price, phone, email } = req.body;
    let u = db.Ad.build({ title, description, price, phone, email });
    console.log("middleware 1");
    return u.save()
        .then((ad) => res.render('message', { message: "your ad was\n" +
                "successfully posted and is waiting for approval" }))
        .catch((err) => {
            if (err instanceof Sequelize.ValidationError) {
                res.render('error', { message: `Invalid input:  ${err}`, error:err});
            } else if (err instanceof Sequelize.DatabaseError) {
                res.render('error', { message: `Database error:  ${err}`, error:err});
            } else {
                res.render('error', { message: `Unexpected error:  ${err}`, error:err});
            }
        })
        .finally(() => next()); // Call next to proceed to the next middleware or route
};

// Middleware for the second '/add' route
const handleAddRoute2 = (req, res, next) => {
    console.log("middleware 2");

    let cookies = new Cookies(req, res, { keys });
    let postAd = cookies.get('PostAd', { signed: true });
    let { email } = req.body;
    let currDate = new Date().toISOString();
    let userData = JSON.stringify({email,currDate});
    cookies.set('PostAd', userData, { signed: true, maxAge: 10000000000000000000009000 * 1000 });

    console.log("All Cookies:", req.cookies);
    next(); // Call next to proceed to the next middleware or route
};

router.post('/add',handleAddRoute2, handleAddRoute1);

module.exports = router;
