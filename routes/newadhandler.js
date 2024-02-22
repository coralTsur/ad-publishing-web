var express = require('express');
const Cookies = require("cookies");
var router = express.Router();
const keys = ['keyboard cat'];

/* GET home page. */
router.get('/', function(req, res, next) {
    let cookies = new Cookies(req, res, { keys });

    let postAd = cookies.get('PostAd', { signed: true });
    if (postAd) {
        const {email,currDate}= JSON.parse(postAd);
        res.render('newAd', {message: "welcome back "+email+ " your previous ad was posted on "+currDate});
    }
    else
        res.render('newAd', {message: "welcome, its your first ad!"});
});

module.exports = router;
