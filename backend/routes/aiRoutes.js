const express = require('express');
const router = express.Router();
const { handleAiChat } = require('../controllers/aiController');
const { verifyToken } = require('../middleware/authMiddleware');

// Protected AI Chat Route
router.post('/chat', verifyToken, handleAiChat);

module.exports = router;
