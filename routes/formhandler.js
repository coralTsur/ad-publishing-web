const express = require('express');
const Cookies = require('cookies');
const Sequelize = require('sequelize');
const router = express.Router();
const newAdController = require('../controllers/newad');


router.post('/add',newAdController.postAdd2, newAdController.postAdd1);
router.get('/add', newAdController.getAdd);

module.exports = router;
