const express = require('express');
const donationController = require('../controllers/donationController');
const router = express.Router();
const authenticate = require('../middleware/auth');

router.post('/donate', authenticate, donationController.createDonation);

module.exports = router;
