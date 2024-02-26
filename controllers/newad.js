const Ad = require('../models/ad');
const Cookies = require("cookies");
const {MAX_TITLE, MIN_PRICE, MAX_DESC,MINUTES_COOKIE} = require("../utilities/consts");
const {format} = require("date-fns");
const keys = ['keyboard cat'];
const db = require('../models');
const Sequelize = require("sequelize");

/**
 * render to new ad and handle message to the user according to cookies
 * @param req
 * @param res
 * @param next
 */
exports.getAd= (req,res,next)=>{
    let cookies = new Cookies(req, res, { keys });

    let postAd = cookies.get('PostAd', { signed: true });
    if (postAd) {
        const {email,currDate} = JSON.parse(postAd);
        res.render('newAd', { maxTitle: MAX_TITLE, minPrice:MIN_PRICE, maxDesc:MAX_DESC, message: "welcome back " + email +
                "! your previous ad was posted on "+ format(new Date(currDate), 'yyyy-MM-dd')});
    }
    else
        res.render('newAd', {message: "welcome, its your first ad!", maxTitle: MAX_TITLE, minPrice:MIN_PRICE, maxDesc:MAX_DESC});
}

/**
 * enter new ad and render to message page
 * Middleware for the first '/add' route
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.postAdd1 = (req, res, next) => {
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

/**
 * set cookie for new ad
 * // Middleware for the second '/add' route
 * @param req
 * @param res
 * @param next
 */
exports.postAdd2 = (req, res, next) => {
    let cookies = new Cookies(req, res, { keys });
    let postAd = cookies.get('PostAd', { signed: true });
    let { email } = req.body;
    let currDate = new Date().toISOString();
    let userData = JSON.stringify({email, currDate});
    cookies.set('PostAd', userData, { signed: true, maxAge: MINUTES_COOKIE * 60 * 1000 });
    next();
};

/**
 * redirect to landing page
 * @param req
 * @param res
 * @param next
 */
exports.getAdd=(req, res, next)=>{
    res.redirect('/');
}