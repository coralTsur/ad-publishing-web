var express = require('express');
const Cookies = require('cookies');

var router = express.Router();

const Sequelize = require('sequelize');

const db = require('../models');
const keys = ['keyboard cat']

/**
 * the goal of this example is to show you how to handle form data
 * using a POST request and how to handle errors
 * This is not an Ajax (SPA) example, it is a traditional form submission
 */

router.get('/add', (req, res) => {
    res.redirect('/'); // redirect to the home page
});

router.post('/add', (req, res) => {
    const { title, description,price, phone, email } = req.body; // req.body.firstName, req.body.lastName, req.body.phone
    let u = db.Ad.build({ title: title, description: description,price:price, phone: phone, email: email });

    return u.save()
        .then((ad) => res.render('added', {message: "The ad was added successfully!"}))
        .catch((err) => {
            // extensive error handling can be done here - you don't always need such a detailed error handling
            if (err instanceof Sequelize.ValidationError) {
                res.render('added', {message: `Invalid input: ${err}`});
            } else if (err instanceof Sequelize.DatabaseError) {
                res.render('added', {message: `Database error: ${err}`});
            } else {
                res.render('added', {message: `Unexpected error: ${err}`});
            }
        })
});

router.post('/add', (req, res) => {

    console.log("enter cookie");
    const cookies = new Cookies(req, res, { keys: keys })

    // Get the cookie
    const postAd = cookies.get('PostAd', { signed: true })
    console.log("postAd value:", postAd);
    if (!postAd) {
        // Set the cookie with expiration time 10 seconds (for testing)
        cookies.set('PostAd', new Date().toISOString(), { signed: true, maxAge: 1000*1000 });
        console.log ("first post");
    }
    else
        console.log("already posted");
    console.log("All Cookies:", req.cookies);
    res.render("landingPage")
});
module.exports = router;
