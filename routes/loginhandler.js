var express = require('express');
const Sequelize = require("sequelize");
var router = express.Router();
const adminAreaController = require('../controllers/adminarea');


router.get('/', adminAreaController.getSession);
router.get('/logout', adminAreaController.getLogout);
router.post('/', adminAreaController.postSetSession);
router.get('/requests-management', adminAreaController.getRequestsManagement1, adminAreaController.getRequestsManagement2);

module.exports = router;
