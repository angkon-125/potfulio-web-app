const express = require('express');
const { getPublicProfile, updateProfile } = require('../controllers/profile');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.get('/public', getPublicProfile);
router.put('/admin', protect, authorize('admin'), updateProfile);

module.exports = router;
