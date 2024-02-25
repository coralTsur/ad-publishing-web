var express = require('express');
const Cookies = require("cookies");
var router = express.Router();
const keys = ['keyboard cat'];
const { format } = require('date-fns');
/* GET home page. */
router.get('/', function(req, res, next) {
    let cookies = new Cookies(req, res, { keys });

    let postAd = cookies.get('PostAd', { signed: true });
    if (postAd) {
        const {email,currDate} = JSON.parse(postAd);
        res.render('newAd', { maxTitle: 20, minPrice:0, maxDesc:200, message: "welcome back " + email +
                "! your previous ad was posted on "+ format(new Date(currDate), 'yyyy-MM-dd')});
    }
    else
        res.render('newAd', {message: "welcome, its your first ad!", maxTitle: 20, minPrice:0, maxDesc:200});
});

module.exports = router;
