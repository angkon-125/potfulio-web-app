const asyncHandler = require('../middleware/async');
const Project = require('../models/Project');
const Message = require('../models/Message');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getDashboardStats = asyncHandler(async (req, res, next) => {
    const projectCount = await Project.count();
    const messageCount = await Message.count();
    const unreadMessages = await Message.count({ where: { read: false } });

    res.status(200).json({
        success: true,
        data: {
            projectCount,
            messageCount,
            unreadMessages
        }
    });
});
