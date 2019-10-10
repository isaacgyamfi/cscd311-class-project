const router = require('express').Router();

const adminController = require('../controllers/admin');

router.get('/report', adminController.getReport);

module.exports = router;
