var express = require('express');
var router = express.Router();
const apiController = require('../controllers/apicontroller');

router.get('/ads', apiController.getAds);
router.post('/ads',apiController.postAds);
router.delete('/ads/:id', apiController.deleteAdsId);
router.put('/ads/:id', apiController.putAdsId);

module.exports = router;
