const db = require("../models");
var express = require('express');
var router = express.Router();
router.get('/ads', (req, res) => {
    return db.Ad.findAll({
        order: [['createdAt', 'DESC']]
    })
        .then((ads) => res.send(ads))
        .catch((err) => {
            console.log('There was an error querying contacts', JSON.stringify(err))
            err.error = 1; // some error code for client side
            return res.status(400).send(err) // send the error to the client
        });
});
router.post('/ads', (req, res) => {
    const { title, description,price, phone, email } = req.body;
    return db.Ads.create({ title, description,price, phone, email })
        .then((ad) => res.status(201).send(ad))
        .catch((err) => {
            console.log('*** error creating a contact', JSON.stringify(ad))
            return res.status(400).send(err)
        })
});

router.delete('/ads/:id', (req, res) => {
    const id = parseInt(req.params.id);
        return db.Ad.findByPk(id)
            .then((contact) => contact.destroy({force: true}))
            .then(() =>res.status(200).json({ message: 'Ad deleted successfully' }))
            .catch((err) => {
                console.log('***Error deleting contact', JSON.stringify(err))
                res.status(400).send(err)
            })
});

router.put('/ads/:id', (req, res) => {
    const id = parseInt(req.params.id);
    return db.Ad.findByPk(id)
        .then((ad) => {
            const { approved } = req.body;
            return ad.update({ approved })
                // .then(() => res.send(ad))
                .then(() =>res.status(200).json({ message: 'Ad approved successfully' }))
                .catch((err) => {
                    console.log('***Error updating contact', JSON.stringify(err))
                    res.status(400).send(err)
                })
        })
});

module.exports = router;
