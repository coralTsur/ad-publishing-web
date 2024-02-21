var express = require('express');
const db = require("../models");
const Sequelize = require("sequelize");
var router = express.Router();


router.get('/', (req, res) => {
    if (!req.session.isAdmin)
        res.render('login',{message: "login page!"}); // redirect to the login page
    else
        res.render('admin',{message:"Admin page"});
});

router.get('/logout', (req, res) => {
    req.session.isAdmin = false;
    res.render('login', {message: "login page!"});
});


router.post('/', (req, res) => {

    const {userName, password} = req.body; //

    return db.User.findOne({
        where: {
            userName: userName,
            password: password
        }
    })
        .then((user) => {
            if (user) {
                // User found in the database
                {
                   // res.render('login', {message: "Login successfully!"});
                    req.session.isAdmin = true;
                    res.render('admin',{message:"Admin page"});
                }
            } else {
                // User not found in the database
                res.render('login', {message: "Invalid username or password"});
            }
        })
        .catch((err) => {
            // extensive error handling can be done here - you don't always need such a detailed error handling

            res.render('login', {message: `Unexpected error: ${err}`});

        })

});

module.exports = router;
