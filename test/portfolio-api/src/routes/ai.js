const express = require('express');
const { getBotResponse } = require('../controllers/ai');

const router = express.Router();

router.post('/', getBotResponse);

module.exports = router;
