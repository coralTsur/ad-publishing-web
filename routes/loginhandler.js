var express = require('express');
const db = require("../models");
const Sequelize = require("sequelize");
var router = express.Router();

/*router.get('/', (req, res) => {
    if (!req.session.isAdmin)
        res.render('login',{message: "login page!"}); // redirect to the login page
    else
        res.render('admin',{message:"Admin page"});
});*/

router.get('/requests-management', (req, res) => {
    if (!req.session.isAdmin)
        res.render('login',{message: "login page!"}); // redirect to the login page
    else
        res.render('admin',{message:"Admin page"});
});

router.get('/logout', (req, res) => {
    req.session.isAdmin = false;
    //res.render('login', {message: "login page!"});
    res.redirect('/');
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
                req.session.isAdmin = true;
                res.redirect('/admin-area/requests-management');
            }
            else
                res.render('login', {message: "Invalid username or password"});
        })
        .catch((err) => {
            res.render('login', {message: `Unexpected error: ${err}`});
        })

});


module.exports = router;
