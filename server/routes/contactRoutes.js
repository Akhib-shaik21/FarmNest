const express = require('express');
const { submitContactForm } = require('../controllers/contactController');
const router = express.Router();

router.post('/', submitContactForm); // POST to /api/contact

module.exports = router;