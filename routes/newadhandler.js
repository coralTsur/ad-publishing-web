var express = require('express');
const { MAX_DESC, MAX_TITLE, MIN_PRICE } = require('../utilities/consts');
const Cookies = require("cookies");
var router = express.Router();

const newAdController = require('../controllers/newad');


router.get('/', newAdController.getAd);

module.exports = router;
