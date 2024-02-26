const db = require("../models");
const Sequelize = require("sequelize");

/**
 * render to login page if it is not admin
 * else redirect to admin-area
 * @param req
 * @param res
 * @param next
 */
exports.getSession=(req,res,next)=>{
    if (!req.session.isAdmin)
        res.render('login',{message: ""}); // redirect to the login page
    else
        res.redirect('/admin-area/requests-management');
}
/**
 * redirect to login page in the user is not admin
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.getRequestsManagement1=(req,res,next )=> {
    if (!req.session.isAdmin) {
        return res.redirect('/admin-area');

    }
    next();
};
/**
 * render to admin page
 * @param req
 * @param res
 * @param next
 */
exports.getRequestsManagement2=(req,res, next)=> {
    res.render('admin',{message: ""}); // redirect to the login page
    next();
};
/**
 * remove the session of the admin and redirect to landing page
 * @param req
 * @param res
 * @param next
 */
exports.getLogout=(req,res,next)=>{
    req.session.isAdmin = false;
    res.redirect('/');
}


/**
 * checks if the user is an admin
 * if so redirects to the admin-area to show all ads.
 * @param req
 * @param res
 * @param next
 */
exports.postSetSession=(req, res, next)=>{
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
            res.render('error', { message: `Unexpected error:  ${err}`, error:err});
        })
}