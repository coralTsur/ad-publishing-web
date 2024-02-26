var express = require('express');
var router = express.Router();
const landingController = require('../controllers/landing');

router.get('/', landingController.getLanding);


module.exports = router;
