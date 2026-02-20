const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Message = require('../models/Message');

// @desc    Create new message
// @route   POST /api/contact
// @access  Public
exports.createMessage = asyncHandler(async (req, res, next) => {
    const message = await Message.create(req.body);

    res.status(201).json({
        success: true,
        data: message
    });
});

// @desc    Get all messages (Admin)
// @route   GET /api/contact/messages
// @access  Private/Admin
exports.getMessages = asyncHandler(async (req, res, next) => {
    const messages = await Message.findAll({
        order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
        success: true,
        count: messages.length,
        data: messages
    });
});

// @desc    Mark message as read
// @route   PUT /api/contact/messages/:id/read
// @access  Private/Admin
exports.markMessageRead = asyncHandler(async (req, res, next) => {
    let message = await Message.findByPk(req.params.id);

    if (!message) {
        return next(new ErrorResponse('Message not found', 404));
    }

    await message.update({ read: true });

    res.status(200).json({
        success: true,
        data: message
    });
});

// @desc    Delete message
// @route   DELETE /api/contact/messages/:id
// @access  Private/Admin
exports.deleteMessage = asyncHandler(async (req, res, next) => {
    const message = await Message.findByPk(req.params.id);

    if (!message) {
        return next(new ErrorResponse('Message not found', 404));
    }

    await message.destroy();

    res.status(200).json({
        success: true,
        data: {}
    });
});
