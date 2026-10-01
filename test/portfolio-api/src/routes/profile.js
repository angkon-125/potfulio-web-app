const express = require('express');
const { getPublicProfile, updateProfile, uploadProfileImage } = require('../controllers/profile');
const upload = require('../middleware/upload');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.get('/public', getPublicProfile);
router.put('/admin', protect, authorize('admin'), updateProfile);
router.put('/upload', protect, authorize('admin'), upload.single('image'), uploadProfileImage);

module.exports = router;
