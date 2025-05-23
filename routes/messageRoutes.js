const express = require('express');
const { verifyToken, verifyAdmin } = require('../middlewares/verifyMiddleware');
const { getAllMessages, postMessage } = require('../controllers/messegeController');
const router = express.Router();

router.get('/contact', verifyToken, verifyAdmin, getAllMessages);
router.post('/contact',postMessage);

module.exports = router;
