var express = require('express');
var router = express.Router();
const db = require('../models');


//אם נספיק להוסיף את הבונוס של החיפוש נעדכן חלק זה
/*router.get('/ads/:title-contain', (req, res) => {
    return db.Ads.findAll({where: {lastName: req.params.lastName}})
        .then((contacts) => res.send(contacts))
        .catch((err) => {
            console.log('There was an error querying contacts', JSON.stringify(err))
            return res.status(400).send(err)
        });
});*/

router.get('/ads/approved', (req, res) => {
    return db.Ad.findAll({
        where: { approved: true},
        order: [['createdAt', 'DESC']]
    })
        .then((ads) => res.send(ads))
        .catch((err) => {
            console.log('There was an error querying contacts', JSON.stringify(err))
            err.error = 1; // some error code for client side
            return res.status(400).send(err) // send the error to the client
        });
});

module.exports = router;
