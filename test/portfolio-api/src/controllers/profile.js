const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Profile = require('../models/Profile');

// @desc    Get public profile
// @route   GET /api/profile/public
// @access  Public
exports.getPublicProfile = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne();

    if (!profile) {
        return next(new ErrorResponse('Profile not found', 404));
    }

    res.status(200).json({
        success: true,
        data: profile
    });
});

// @desc    Update profile (Admin only)
// @route   PUT /api/profile/admin
// @access  Private/Admin
exports.updateProfile = asyncHandler(async (req, res, next) => {
    let profile = await Profile.findOne();

    if (!profile) {
        // If no profile exists, create one
        profile = await Profile.create(req.body);
    } else {
        await profile.update(req.body);
        // In Sequelize, the instance is updated in place, validation runs by default on update
    }

    res.status(200).json({
        success: true,
        data: profile
    });
});
// @desc    Upload profile image
// @route   PUT /api/profile/upload
// @access  Private/Admin
exports.uploadProfileImage = asyncHandler(async (req, res, next) => {
    if (!req.file) {
        return next(new ErrorResponse('Please upload a file', 400));
    }

    let profile = await Profile.findOne();
    const imageUrl = `/uploads/${req.file.filename}`;

    if (!profile) {
        profile = await Profile.create({
            name: '',
            bio: '',
            avatar: imageUrl
        });
    } else {
        await profile.update({ avatar: imageUrl });
    }

    res.status(200).json({
        success: true,
        data: imageUrl
    });
});
