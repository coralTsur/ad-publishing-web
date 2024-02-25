const db = require("../models");
var express = require('express');
var router = express.Router();
router.get('/ads', (req, res) => {
    return db.Ad.findAll({
        order: [['createdAt', 'DESC']]
    })
        .then((ads) => res.send(ads))
        .catch((err) => {
            err.error = 1;
            return res.status(400).send(err)
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
                res.status(400).send(err);
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
                    res.status(400).send(err);
                })
        })
});

module.exports = router;
