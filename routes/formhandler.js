const express = require('express');
const Cookies = require('cookies');
const Sequelize = require('sequelize');
const db = require('../models');

const router = express.Router();
const keys = ['keyboard cat'];

// Middleware for the first '/add' route
const handleAddRoute1 = (req, res, next) => {
    let { title, description, price, phone, email } = req.body;
    title = title.trim();
    description = description.trim();
    let u = db.Ad.build({ title, description, price, phone, email });
    return u.save()
        .then((ad) => res.render('message', { message: "Your ad has been successfully posted" +
                " and is now awaiting approval" }))
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
    let cookies = new Cookies(req, res, { keys });
    let postAd = cookies.get('PostAd', { signed: true });
    let { email } = req.body;
    let currDate = new Date().toISOString();
    let userData = JSON.stringify({email, currDate});
    cookies.set('PostAd', userData, { signed: true, maxAge: 10000000000*1000000000009000 * 1000 });
    next(); // Call next to proceed to the next middleware or route
};

router.post('/add',handleAddRoute2, handleAddRoute1);

router.get('/add', (req, res) => {
    res.redirect('/');
});

module.exports = router;
