const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middlewares/verifyMiddleware');
const { getAllReviews, getReviewCount, addReview } = require('../controllers/reviewController');

router.get('/reviewCount', verifyToken, verifyAdmin, getReviewCount);
router.get('/reviews', getAllReviews);
router.post('/reviews', verifyToken,addReview);

module.exports = router;
