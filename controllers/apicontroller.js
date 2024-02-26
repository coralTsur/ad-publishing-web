const db = require('../models');
const Sequelize = require("sequelize");
const { Op } = require('sequelize');

/**
 * return from the DB all approved ads in desc order
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.getAdApproved=(req,res,next)=>
{
    return db.Ad.findAll({
        where: { approved: true},
        order: [['createdAt', 'DESC']]
    })
        .then((ads) => res.send(ads))
        .catch((err) => {
            err.error = 1;
            return res.status(400).send(err)
        });
}
/**
 * return from the DB all ads in desc order
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.getAds=(req,res,next)=>{
    return db.Ad.findAll({
        order: [['createdAt', 'DESC']]
    })
        .then((ads) => res.send(ads))
        .catch((err) => {
            err.error = 1;
            return res.status(400).send(err)
        });
}

/**
 * create new ads into DB
 * @param req
 * @param res
 * @param next
 * @returns {Promise<unknown>}
 */
exports.postAds=(req,res,next)=>{
    const { title, description,price, phone, email } = req.body;
    return db.Ads.create({ title, description,price, phone, email })
        .then((ad) => res.status(201).send(ad))
        .catch((err) => {
            return res.status(400).send(err)
        })
}

/**
 * deleting ad from the DB according to id from the admin
 * @param req
 * @param res
 * @param next
 * @returns {Promise<* | void>}
 */
exports.deleteAdsId=(req,res,next)=>{
    const id = parseInt(req.params.id);
    return db.Ad.findByPk(id)
        .then((contact) => contact.destroy({force: true}))
        .then(() =>res.status(200).json({ message: 'Ad deleted successfully' }))
        .catch((err) => {
            res.status(400).send(err);
        })
}

/**
 * update ad from the DB according to id from the admin
 * @param req
 * @param res
 * @param next
 * @returns {Promise<* | void>}
 */
exports.putAdsId=(req,res,next)=>{
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
}

/**
 * search in DB for title that contain user's input
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.getSearch=(req,res,next)=>{
    let searchInTitle = req.query.term;
    searchInTitle = decodeURIComponent(searchInTitle);
    return db.Ad.findAll({
        where: {
            title: {
                [Op.like]: `%${searchInTitle}%`
            },
            approved: true
        },
        order: [['createdAt', 'DESC']]

    })
        .then((ads) => res.send(ads))
        .catch((err) => {
            err.error = 1;
            return res.status(400).send(err)
        });
}