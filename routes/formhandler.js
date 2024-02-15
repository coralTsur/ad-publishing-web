var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');

const db = require('../models');

/**
 * the goal of this example is to show you how to handle form data
 * using a POST request and how to handle errors
 * This is not an Ajax (SPA) example, it is a traditional form submission
 */
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

router.get('/add', (req, res) => {
    res.redirect('/'); // redirect to the home page
});

module.exports = router;
