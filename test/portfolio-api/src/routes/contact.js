const express = require('express');
const { createMessage, getMessages, markMessageRead, deleteMessage } = require('../controllers/contact');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.post('/', createMessage);
router.get('/messages', protect, authorize('admin'), getMessages);
router.put('/messages/:id/read', protect, authorize('admin'), markMessageRead);
router.delete('/messages/:id', protect, authorize('admin'), deleteMessage);

module.exports = router;
