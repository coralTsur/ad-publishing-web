var express = require('express');
var router = express.Router();
const apiController = require('../controllers/apicontroller');



router.get('/ads/approved',apiController.getAdApproved);
router.get('/ads/search',apiController.getSearch);
module.exports = router;
